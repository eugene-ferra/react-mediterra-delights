import userService from "../services/userService.js";
import { getQueryData } from "../utils/getQueryData.js";
import { productService } from "../services/productService.js";
import { articleService } from "../services/articleService.js";
import { validationResult } from "express-validator";
import addLinks from "../utils/addLinks.js";
import productModel from "../models/productModel.js";
import articleModel from "../models/articleModel.js";

export const getUsers = async (req, res, next) => {
  try {
    const { filterObj, sortObj, page, limit } = getQueryData(req);
    let data = await userService.getAll({ filterObj, sortObj, page, limit });
    data = data.map((item) => addLinks(req, item, "avatar"));

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    let data = await userService.getOne({ id: req.user._id });

    data = addLinks(req, data[0], "avatar");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const saveProduct = async (req, res, next) => {
  try {
    let data = await userService.addToArray(
      req.user._id,
      "savedProducts",
      req.body.id,
      productModel
    );
    data = addLinks(req, data[0], "avatar");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const discardProduct = async (req, res, next) => {
  try {
    let data = await userService.deleteFromArray(
      req.user._id,
      "savedProducts",
      req.params.id
    );
    data = addLinks(req, data[0], "avatar");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const likeArticle = async (req, res, next) => {
  try {
    let data = await userService.addToArray(
      req.user._id,
      "likedArticles",
      req.body.id,
      articleModel
    );

    data = addLinks(req, data[0], "avatar");
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const unlikeArticle = async (req, res, next) => {
  try {
    let data = await userService.deleteFromArray(
      req.user._id,
      "likedArticles",
      req.params.id
    );
    data = addLinks(req, data[0], "avatar");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const saveArticle = async (req, res, next) => {
  try {
    let data = await userService.addToArray(
      req.user._id,
      "savedArticles",
      req.body.id,
      articleModel
    );
    data = addLinks(req, data[0], "avatar");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const discardArticle = async (req, res, next) => {
  try {
    let data = await userService.deleteFromArray(
      req.user._id,
      "savedArticles",
      req.params.id
    );
    data = addLinks(req, data[0], "avatar");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const prodData = { id: req.body.id, quantity: req.body.quantity };

    let data = await userService.addToArray(
      req.user._id,
      "cart",
      prodData,
      productModel
    );
    data = addLinks(req, data[0], "avatar");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFromCart = async (req, res, next) => {
  try {
    let data = await userService.deleteFromArray(req.user._id, "cart", req.params.id);
    data = addLinks(req, data[0], "avatar");
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    let data = await userService.updateCart(
      req.user._id,
      req.params.id,
      req.body.quantity
    );
    data = addLinks(req, data[0], "avatar");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const userInfo = {
      name: req.body?.name,
      lastName: req.body?.lastName,
      phone: req.body?.phone,
      oldPassword: req.body?.oldPassword,
      password: req.body?.password,
    };

    let data = await userService.updateOne(req.user._id, userInfo, req?.file?.buffer);

    data = addLinks(req, data[0], "avatar");

    res.status(200).json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteOne(req.user._id);
    res.status(204).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

export const changeRole = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    let data = await userService.updateOne(req.params.id, { role: req.body.role });

    res.status(200).json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};
