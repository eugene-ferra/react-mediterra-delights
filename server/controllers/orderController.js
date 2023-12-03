import { orderService } from "../services/orderService.js";
import { getQueryData } from "../utils/getQueryData.js";
import { validationResult } from "express-validator";

export const addOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const data = {
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      products: req.body.products,
      deliveryType: req.body.deliveryType,
      deliveryAddress: req.body.deliveryAddress,
      pickupLocation: req.body.pickupLocation,
      deliveryTime: req.body.deliveryTime,
      paymentType: req.body.paymentType,
    };

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

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
