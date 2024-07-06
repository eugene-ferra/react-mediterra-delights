import Stripe from "stripe";
import mongoose from "mongoose";
import OrderDTO from "../dto/orderDTO.js";
import orderModel from "../models/orderModel.js";
import ProductService from "./productService.js";
import AppError from "../utils/appError.js";
import addLinks from "../utils/addLinks.js";

export default class orderService {
  async countPages(filterObj, limit = 15) {
    /* count all pages based on filters and items per page (limit) */

    const docs = await orderModel.countDocuments(filterObj);
    return Math.ceil(docs / limit);
  }

  async addOrder(data) {
    /* add order to db */

    const productService = new ProductService();

    // get products from db and calculate total sum
    data.products = await Promise.all(
      data.products.map(async (item) => {
        const product = await productService.getOne(item.id, false);

        return {
          id: item.id,
          quantity: item.quantity,
          price: (product?.discountPrice || product.price) * item.quantity,
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
        break;
      }
      default:
        break;
    }
    data.number = new Date().valueOf();

    const order = await orderModel.create(data);
    await order.populate({ path: "products.id" });

    const transformedItem = new OrderDTO(order);
    transformedItem.products = transformedItem.products.map((item) => {
      const product = addLinks(item.product, ["imgCover", "images"]);
      return { product, quantity: item.quantity, price: item.price };
    });

    return transformedItem;
  }

  async getAll({ filterObj, sortObj, page = 1, limit = 15 }) {
    /* get all orders with pagination, sorting and filtering */

    let data = await orderModel
      .find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "products.id" });

    if (!data.length) {
      throw new AppError("Замовлень за таким запитом не знайдено!", 404);
    }

    // add empty object if product is not found
    data = data.map((order) => {
      order.products = order.products.map((prod) => {
        if (!prod.id?._id) prod.id = {};

        return prod;
      });
      return order;
    });

    return data.map((item) => {
      const transformedItem = new OrderDTO(item);

      transformedItem.products = transformedItem.products.map((prodItem) => {
        const product = addLinks(prodItem.product, ["imgCover", "images"]);
        return { product, quantity: prodItem.quantity, price: prodItem.price };
      });
      return transformedItem;
    });
  }

  async getOne(id) {
    /* get one order by id or number */

    let doc;

    if (mongoose.isValidObjectId(id)) {
      doc = await orderModel.findById(id).populate({ path: "products.id" }).exec();
    } else {
      doc = await orderModel.findOne({ number: id }).populate({ path: "products.id" });
    }

    if (!doc) {
      if (!doc) throw new AppError("Замовлень з таким номером не знайдено", 404);
    }

    // add empty object if product is not found
    doc.products = doc.products.map((prod) => {
      if (!prod.id?._id) prod.id = {};
      return prod;
    });

    const transformedItem = new OrderDTO(doc);
    transformedItem.products = transformedItem.products.map((item) => {
      const product = addLinks(item.product, ["imgCover", "images"]);
      return { product, quantity: item.quantity, price: item.price };
    });

    return transformedItem;
  }

  getOptions() {
    /* get all possible options for order */

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

  async updateOne(id, data) {
    /* update order by id */

    await this.getOne(id);

    const productService = new ProductService();

    // get products from db and calculate total sum
    if (data?.products) {
      data.products = await Promise.all(
        data.products.map(async (item) => {
          const product = await productService.getOne(item.id, false);

          return {
            id: item.id,
            quantity: item.quantity,
            price: (product?.discountPrice || product.price) * item.quantity,
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
        break;
      }
      default:
        break;
    }

    const order = await orderModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });

    // add empty object if product is not found
    order.products = order.products.map((prod) => {
      if (!prod.id?._id) prod.id = {};
      return prod;
    });

    const transformedItem = new OrderDTO(order);
    transformedItem.products = transformedItem.products.map((item) => {
      const product = addLinks(item.product, ["imgCover", "images"]);
      return { product, quantity: item.quantity, price: item.price };
    });

    return transformedItem;
  }

  async proceedOrder(id, status, isPayed) {
    /* proceed order by id */

    await this.getOne(id);

    const order = await orderModel
      .findByIdAndUpdate(id, { status, isPayed }, { runValidators: true, new: true })
      .populate({ path: "products.id" });

    order.products = order.products.map((prod) => {
      if (!prod.id?._id) prod.id = {};
      return prod;
    });

    const transformedItem = new OrderDTO(order);
    transformedItem.products = transformedItem.products.map((item) => {
      const product = addLinks(item.product, ["imgCover", "images"]);
      return { product, quantity: item.quantity, price: item.price };
    });

    return transformedItem;
  }

  async createCheckout(orderDTO) {
    /* create checkout session for order */

    const productService = new ProductService();

    const orderItems = orderDTO.products.map(async (item) => {
      const product = await productService.getOne(item.product.id);

      return {
        price_data: {
          currency: "uah",
          unit_amount: (product?.discountPrice || product.price) * 100,
          product_data: {
            name: product.title,
            description: product?.description,
          },
        },
        quantity: item.quantity,
      };
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const session = await stripe.checkout.sessions.create({
      client_reference_id: `${orderDTO.number}`,
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/order/success/${orderDTO.number}`,
      customer_email: orderDTO.email,
      line_items: await Promise.all(orderItems),
      mode: "payment",
      locale: "ru",
    });

    return session;
  }

  async proceedHook(body, sign) {
    /* proceed stripe webhook */

    const stripe = new Stripe(process.env.STRIPE_SECRET);
    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
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

  async getStatsByYear(year) {
    /* get sales stats by year */

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

    let topSalers = await orderModel.aggregate([
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

    for (let i = 1; i <= 12; i += 1) {
      if (!incomeStats.some((item) => item.month === i)) {
        incomeStats.push({
          totalSum: 0,
          orders: 0,
          avgOrderSum: 0,
          month: i,
        });
      }
    }

    incomeStats = incomeStats.sort((a, b) => a.month - b.month);
    topSalers = topSalers.map((item) => {
      const obj = {
        product: addLinks(item.product[0], ["imgCover", "images"]),
        quantity: item.quantity,
      };
      return obj;
    });

    return { incomeStats, topSalers };
  }

  async getStatsByMonth(year, month) {
    /* get sales stats by month */

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

    let topSalers = await orderModel.aggregate([
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

    for (let i = 1; i <= lastDayOfMonth; i += 1) {
      if (!incomeStats.some((item) => item.day === i)) {
        incomeStats.push({
          totalSum: 0,
          orders: 0,
          avgOrderSum: 0,
          day: i,
        });
      }
    }

    incomeStats = incomeStats.sort((a, b) => a.day - b.day);
    topSalers = topSalers.map((item) => {
      const obj = {
        product: addLinks(item.product[0], ["imgCover", "images"]),
        quantity: item.quantity,
      };
      return obj;
    });

    return { incomeStats, topSalers };
  }
}
