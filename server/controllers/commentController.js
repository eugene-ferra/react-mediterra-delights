import commentModel from "../models/commentModel.js";
import AppError from "../utils/appError.js";
import * as factory from "./handleFactory.js";

export const setArticlesIds = (req, res, next) => {
  if (!req.body.articleID) req.body.articleID = req.params.articleID;
  if (!req.body.userID) req.body.userID = req.user._id;
  next();
};

export const presetStatus = (req, res, next) => {
  req.body.isModerated = false;
  next();
};

export const checkUpdate = (req, res, next) => {
  const keys = Object.keys(req.body);

  if (req.user.role === "user" && keys.includes("isModerated")) {
    return next(
      new AppError("You don't have permissions to perform this action!", 403)
    );
  }

  if (req.user.role === "admin" && keys.length > 1) {
    return next(
      new AppError("You don't have permissions to perform this action!", 403)
    );
  }

  if (!keys.includes("isModerated") && req.user.role === "admin") {
    return next(
      new AppError("You don't have permissions to perform this action!", 403)
    );
  }

  next();
};

export const addComment = factory.addOne(commentModel);
export const getAllComments = factory.getAll(commentModel);
export const getComment = factory.getOne(commentModel);
export const updateComment = factory.updateOne(commentModel);
export const deleteComment = factory.deleteOne(commentModel);
