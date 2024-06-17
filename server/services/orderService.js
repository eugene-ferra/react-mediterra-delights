import { OrderDTO } from "../dto/orderDTO.js";
import orderModel from "../models/orderModel.js";
import { productService } from "../services/productService.js";
import AppError from "../utils/appError.js";
import { authService } from "./authService.js";
import Mailer from "./mailerService.js";
import Stripe from "stripe";
import userModel from "../models/userModel.js";

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
      await userModel.findByIdAndUpdate(decoded.id, {
        cart: [],
        $push: { ["orders"]: order._id },
      });

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
      .limit(limit)
      .populate({ path: "products.id" });

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }
    const docs = await orderModel.countDocuments(filterObj);

    return [{ pages: Math.ceil(docs / limit) }, data.map((item) => new OrderDTO(item))];
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
      shopGeo: [
        [50.0123029, 36.243651761572096],
        [50.001016250000006, 36.2438107722186],
        [50.00886735, 36.24091788725961],
      ],
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
    const order = await orderModel
      .findByIdAndUpdate(id, { status, isPayed }, { runValidators: true, new: true })
      .populate({ path: "products.id" });

    return [new OrderDTO(order)];
  }

  static async createCheckout(orderData, userToken) {
    const newOrder = await this.addOrder(orderData, userToken);

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

  static async getStatsByYear(year) {
    let incomeStats = await orderModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [{ $eq: [{ $year: "$time" }, +year] }],
          },
          status: "Замовлення отримано",
        },
      },
      {
        $group: {
          _id: { $month: "$time" },
          totalSum: { $sum: "$totalSum" },
          avgOrderSum: { $avg: "$totalSum" },
          orders: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          totalSum: 1,
          avgOrderSum: 1,
          orders: 1,
          _id: 0,
        },
      },
    ]);

    const topSalers = await orderModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [{ $eq: [{ $year: "$time" }, +year] }],
          },
          status: "Замовлення отримано",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: {
            year: { $year: "$time" },
            product_id: "$products.id",
          },
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id.product_id",
          quantity: "$totalQuantity",
        },
      },
      { $sort: { quantity: -1 } },
      {
        $lookup: {
          from: "products",
          localField: "id",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);

    if (!incomeStats.length) {
      throw new AppError("Даних за цей період не знайдено", 404);
    }

    for (let i = 1; i <= 12; i++) {
      if (!incomeStats.some((item) => item.month == i)) {
        incomeStats.push({
          totalSum: 0,
          orders: 0,
          avgOrderSum: 1,
          month: i,
        });
      }
    }

    incomeStats = incomeStats.sort((a, b) => a.month - b.month);

    return { incomeStats, topSalers };
  }

  static async getStatsByMonth(year, month) {
    let incomeStats = await orderModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$time" }, +year] },
              { $eq: [{ $month: "$time" }, +month] },
            ],
          },
          status: "Замовлення отримано",
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$time" },
          totalSum: { $sum: "$totalSum" },
          avgOrderSum: { $avg: "$totalSum" },
          orders: { $sum: 1 },
        },
      },
      {
        $project: {
          day: "$_id",
          totalSum: 1,
          avgOrderSum: 1,
          orders: 1,
          _id: 0,
        },
      },
    ]);

    const lastDayOfMonth = 32 - new Date(year, month - 1, 32).getDate();

    const topSalers = await orderModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$time" }, +year] },
              { $eq: [{ $month: "$time" }, +month] },
            ],
          },
          status: "Замовлення отримано",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: {
            year: { $year: "$time" },
            month: { $month: "$time" },
            product_id: "$products.id",
          },
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id.product_id",
          quantity: "$totalQuantity",
        },
      },
      { $sort: { quantity: -1 } },
      {
        $lookup: {
          from: "products",
          localField: "id",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);

    if (!incomeStats.length) {
      throw new AppError("Даних за цей період не знайдено", 404);
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
      if (!incomeStats.some((item) => item.day == i)) {
        incomeStats.push({
          totalSum: 0,
          orders: 0,
          avgOrderSum: 0,
          day: i,
        });
      }
    }

    incomeStats = incomeStats.sort((a, b) => a.day - b.day);

    return { incomeStats, topSalers };
  }
}
