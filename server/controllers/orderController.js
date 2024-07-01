import OrderService from "../services/orderService.js";
import getOrderData from "../utils/getOrderData.js";
import getQueryData from "../utils/getQueryData.js";
import AuthService from "../services/authService.js";
import UserService from "../services/userService.js";
import Mailer from "../services/mailerService.js";
import sendResponse from "../utils/sendResponse.js";

export const createCheckout = async (req, res, next) => {
  try {
    const orderService = new OrderService();
    const authService = new AuthService();
    const userService = new UserService();
    const mailer = new Mailer();

    const data = getOrderData(req);
    const userToken = req?.cookies?.access;

    const order = await orderService.addOrder(data);

    const session = await orderService.createCheckout(order);

    if (userToken) {
      const { id } = await authService.validateAccessToken(userToken);
      await userService.addToArray(id, "orders", data.id);
      await userService.clearCart(id);
    } else {
      res.cookie("cart", JSON.stringify([]));
    }

    await mailer.sendMail(order.email, "Замовлення прийнято!", "orderEmail.ejs", {
      name: order.name,
      orderNum: order.number,
      products: order.products,
      total: order.totalSum,
    });

    sendResponse({ res, statusCode: 201, data: { session: session } });
  } catch (error) {
    next(error);
  }
};

export const proceedPayment = async (req, res, next) => {
  try {
    const orderService = new OrderService();

    await orderService.proceedHook(req.body, req.headers["stripe-signature"]);
    sendResponse({ res, statusCode: 200 });
  } catch (err) {
    next(err);
  }
};

export const addOrder = async (req, res, next) => {
  try {
    const orderService = new OrderService();
    const authService = new AuthService();
    const userService = new UserService();
    const mailer = new Mailer();

    const data = getOrderData(req);
    const userToken = req?.cookies?.access;

    const order = await orderService.addOrder(data);

    if (userToken) {
      const { id } = await authService.validateAccessToken(userToken);
      await userService.addToArray(id, "orders", data.id);
      await userService.clearCart(id);
    } else {
      res.cookie("cart", JSON.stringify([]));
    }

    await mailer.sendMail(order.email, "Замовлення прийнято!", "orderEmail.ejs", {
      name: order.name,
      orderNum: order.number,
      products: order.products,
      total: order.totalSum,
    });

    sendResponse({ res, statusCode: 201, data: order });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orderService = new OrderService();

    const { filterObj, sortObj, page, limit } = getQueryData(req);

    const data = await orderService.getAll({ filterObj, sortObj, page, limit });
    const pages = await orderService.countPages(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { pages, data } });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const orderService = new OrderService();

    const data = await orderService.getOne(req.params.id);

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

export const getOptions = (req, res, next) => {
  try {
    const orderService = new OrderService();

    const data = orderService.getOptions();

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const orderService = new OrderService();

    const data = getOrderData(req);

    const order = await orderService.updateOne(req.params.id, data);

    sendResponse({ res, statusCode: 200, data: order });
  } catch (error) {
    next(error);
  }
};

export const proceedOrder = async (req, res, next) => {
  try {
    const orderService = new OrderService();
    const { id } = req.params;
    const { status, isPayed } = req.body;

    const order = await orderService.proceedOrder(id, status, isPayed);

    sendResponse({ res, statusCode: 200, data: order });
  } catch (error) {
    next(error);
  }
};

export const getStatsByYear = async (req, res, next) => {
  try {
    const orderService = new OrderService();

    const { year } = req.params;

    const data = await orderService.getStatsByYear(year);

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};
export const getStatsByMonth = async (req, res, next) => {
  try {
    const orderService = new OrderService();

    const { year, month } = req.params;
    const data = await orderService.getStatsByMonth(year, month);

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};
