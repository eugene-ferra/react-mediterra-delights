import reviewModel from "../models/reviewModel.js";
import * as factory from "./handleFactory.js";
import AppError from "../utils/appError.js";

export const setReviewsIds = (req, res, next) => {
  if (!req.body.productID) req.body.productID = req.params.productID;
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

export const setFilters = (filterKey) => {
  return (req, res, next) => {
    req.filterObj = {};
    req.filterObj[filterKey] = req.params.id;
    next();
  };
};

export const addReview = factory.addOne(reviewModel);

export const getAllReviews = factory.getAll(reviewModel);

export const getReview = factory.getOne(reviewModel);

export const updateReview = factory.updateOne(reviewModel);
export const deleteReview = factory.deleteOne(reviewModel);
