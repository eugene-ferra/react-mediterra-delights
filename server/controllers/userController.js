import userService from "../services/userService.js";
import { getQueryData } from "../utils/getQueryData.js";
import { productService } from "../services/productService.js";
import { articleService } from "../services/articleService.js";
import { validationResult } from "express-validator";

export const getUsers = async (req, res, next) => {
  try {
    const { filterObj, sortObj, page, limit } = getQueryData(req);
    const data = await userService.getAll({ filterObj, sortObj, page, limit });
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
    const data = await userService.getOne({ id: req.user._id });

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { id } = req.body;

    await productService.getOne({ id });
    const data = await userService.userInteractionAdd(
      req.params.userID,
      "savedProducts",
      id
    );

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { id } = req.params;

    const data = await userService.userInteractionDelete(
      req.params.userID,
      "savedProducts",
      id
    );

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { id } = req.body;

    await articleService.getOne({ id });
    const data = await userService.userInteractionAdd(
      req.params.userID,
      "likedArticles",
      id
    );

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const data = await userService.userInteractionDelete(
      req.params.userID,
      "likedArticles",
      id
    );

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { id } = req.body;

    await articleService.getOne({ id });
    const data = await userService.userInteractionAdd(
      req.params.userID,
      "savedArticles",
      id
    );

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { id } = req.params;

    const data = await userService.userInteractionDelete(
      req.params.userID,
      "savedArticles",
      id
    );

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
