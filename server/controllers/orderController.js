import { orderService } from "../services/orderService.js";
import { getOrderData } from "../utils/getOrderData.js";
import { getQueryData } from "../utils/getQueryData.js";
import { checkBodyErrors } from "../utils/checkBodyErrors.js";

export const addOrder = async (req, res, next) => {
  try {
    checkBodyErrors(req, res);

    const data = getOrderData(req);

    const order = await orderService.addOrder(
      data,
      req?.headers?.authorization?.split(" ")[1]
    );

    res.status(201).json({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const { filterObj, sortObj, page, limit } = getQueryData(req);

    let data = await orderService.getAll({
      filterObj,
      sortObj,
      page,
      limit,
    });

    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    checkBodyErrors(req, res);

    let data = await orderService.getOne(req.params.id);

    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

export const getOptions = (req, res, next) => {
  try {
    const data = orderService.getOptions();

    res.status(200).json({
      status: "succes",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    checkBodyErrors(req, res);

    const data = getOrderData(req);

    const order = await orderService.updateOne(req.params.id, data);

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const proceedOrder = async (req, res, next) => {
  try {
    checkBodyErrors(req, res);

    const order = await orderService.proceedOrder(
      req.params.id,
      req.body?.status,
      req.body?.status
    );

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};
