import { validationResult } from "express-validator";
import orderService from "../services/orderService.js";
import getOrderData from "../utils/getOrderData.js";
import getQueryData from "../utils/getQueryData.js";
import addLinks from "../utils/addLinks.js";

export const createCheckout = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const session = await orderService.createCheckout(req.body, req?.cookies?.access);

    if (!req?.cookies?.access) res.cookie("cart", JSON.stringify([]));

    res.status(200).json({ status: "success", data: { session: session } });
  } catch (error) {
    next(error);
  }
};

export const proceedPayment = async (req, res, next) => {
  try {
    await orderService.proceedHook(req.body, req.headers["stripe-signature"]);

    res.status(200);
  } catch (err) {
    next(err);
  }
};

export const addOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const data = getOrderData(req);

    const order = await orderService.addOrder(data, req?.cookies?.access);

    if (!req?.cookies?.access) res.cookie("cart", JSON.stringify([]));

    res.status(201).json({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const { filterObj, sortObj, page, limit } = getQueryData(req);

    const data = await orderService.getAll({
      filterObj,
      sortObj,
      page,
      limit,
    });

    data[1].map((order) =>
      order.products.map((doc) => addLinks(req, doc.product, ["imgCover", "images"]))
    );

    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const data = await orderService.getOne(req.params.id, { path: "products.id" });
    data?.[0].products?.map((item) =>
      addLinks(req, item?.product, ["imgCover", "images"])
    );

    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

export const getOptions = (req, res, next) => {
  try {
    const data = orderService.getOptions();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const data = getOrderData(req);

    const order = await orderService.updateOne(req.params.id, data);

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const proceedOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const order = await orderService.proceedOrder(
      req.params.id,
      req.body?.status,
      req.body?.isPayed
    );

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const getStatsByYear = async (req, res, next) => {
  try {
    const data = await orderService.getStatsByYear(req.params.year);

    data.topSalers.map((item) => addLinks(req, item.product[0], "imgCover"));

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};
export const getStatsByMonth = async (req, res, next) => {
  try {
    const data = await orderService.getStatsByMonth(req.params.year, req.params.month);
    data.topSalers.map((item) => addLinks(req, item.product[0], "imgCover"));

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};
