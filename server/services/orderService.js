import { OrderDTO } from "../dto/orderDTO.js";
import orderModel from "../models/orderModel.js";
import { productService } from "../services/productService.js";
import AppError from "../utils/appError.js";
import { authService } from "./authService.js";
import Mailer from "./mailerService.js";
import userService from "../services/userService.js";
import Stripe from "stripe";

export class orderService {
  static async addOrder(data, userToken) {
    let decoded;

    if (userToken) {
      decoded = await authService.validateAccessToken(userToken);
      if (!decoded) throw new AppError("invalid token!");
    }

    let addedProducts = [];

    data["products"] = await Promise.all(
      data.products.map(async (item) => {
        const product = await productService.getOne({ id: item.id });
        if (!product) throw new AppError("incorrect products!", 400);

        addedProducts.push({
          title: product[0].title,
          quantity: item.quantity,
          price: (product[0]?.discountPrice || product[0].price) * item.quantity,
        });

        return {
          id: item.id,
          quantity: item.quantity,
          price: (product[0]?.discountPrice || product[0].price) * item.quantity,
        };
      })
    );

    data.totalSum = data.products.reduce((acc, product) => acc + product.price, 0);
    data.status = "Замовлення в обробці";

    switch (data.deliveryType) {
      case "Самовивіз":
        data.deliveryAddress = {};
        break;
      case "Доставка кур'єром": {
        data.pickupLocation = null;
      }
      default:
        break;
    }
    data["number"] = new Date().valueOf();

    const order = await (
      await orderModel.create(data)
    ).populate({ path: "products.id" });

    if (decoded)
      await userService.updateOne(decoded.id, { $push: { ["orders"]: order._id } });

    await Mailer.sendMail(data.email, "Замовлення прийнято!", "orderEmail.ejs", {
      name: data.name,
      orderNum: order.number,
      products: addedProducts,
      total: order.totalSum,
    });

    return new OrderDTO(order);
  }

  static async getAll({ filterObj, sortObj, page = 1, limit = 15 }) {
    const data = await orderModel
      .find(filterObj)
      .sort(sortObj)
      .skip(--page * limit)
      .limit(limit);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }

    return data.map((item) => new OrderDTO(item));
  }

  static async getOne(id, populateObj) {
    let doc = await orderModel.findOne({ number: id }).populate(populateObj);

    if (!doc) {
      doc = await orderModel.findById(id).populate(populateObj).exec();
      if (!doc) throw new AppError("There aren't documents with this id!", 404);
    }

    return [new OrderDTO(doc)];
  }

  static getOptions() {
    const options = {
      deliveryType: orderModel.schema.path("deliveryType").enumValues,
      pickupLocation: orderModel.schema.path("pickupLocation").enumValues,
      paymentType: orderModel.schema.path("paymentType").enumValues,
      status: orderModel.schema.path("status").enumValues,
    };

    return options;
  }

  static async updateOne(id, data) {
    if (data?.products) {
      data.products = await Promise.all(
        data.products.map(async (item) => {
          const product = await productService.getOne({ id: item.id });
          if (!product) throw new AppError("incorrect products!", 400);

          return {
            id: item.id,
            quantity: item.quantity,
            price: product[0]?.discountPrice || product[0].price * item.quantity,
          };
        })
      );

      data.totalSum = data.products.reduce((acc, product) => acc + product.price, 0);
    }

    switch (data.deliveryType) {
      case "Самовивіз":
        data.deliveryAddress = {};
        break;
      case "Доставка кур'єром": {
        data.pickupLocation = null;
      }
      default:
        break;
    }

    const order = await orderModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });

    if (!order) throw new AppError("There aren't documents with this id!", 404);

    return [new OrderDTO(order)];
  }

  static async proceedOrder(id, status, isPayed) {
    const order = await orderModel.findByIdAndUpdate(
      id,
      { status, isPayed },
      { runValidators: true, new: true }
    );

    return [new OrderDTO(order)];
  }

  static async createCheckout(orderData) {
    const newOrder = await this.addOrder(orderData);

    const orderItems = orderData.products.map(async (item) => {
      const product = await productService.getOne({ id: item.id });

      return {
        price_data: {
          currency: "uah",
          unit_amount: (product[0]?.discountPrice || product[0].price) * 100,
          product_data: {
            name: product[0].title,
            description: product[0]?.description,
          },
        },
        quantity: item.quantity,
      };
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const session = await stripe.checkout.sessions.create({
      client_reference_id: `${newOrder.number}`,
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/order/success/${newOrder.number}`,
      customer_email: orderData.email,
      line_items: await Promise.all(orderItems),
      mode: "payment",
      locale: "ru",
    });

    return session;
  }

  static async proceedHook(body, sign) {
    let stripeEvent;
    try {
      stripeEvent = Stripe.webhooks.constructEvent(
        body,
        sign,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      throw new AppError(`Webhook Error: ${err.message}`);
    }

    if (stripeEvent.type === "checkout.session.completed") {
      await orderModel.findOneAndUpdate(
        { number: stripeEvent.data.object.client_reference_id },
        { isPayed: true },
        { runValidators: true, new: true }
      );
    }
  }
}
