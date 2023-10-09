import userModel from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll, getOne, userAction } from "./handleFactory.js";
import productModel from "../models/productModel.js";
import AppError from "../utils/appError.js";
import articleModel from "../models/articleModel.js";

export const getUsers = getAll(userModel);

export const setUserId = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

export const getMe = getOne(userModel, {
  path: "savedProducts likedArticles savedArticles addedComments addedReviews",
});

export const addSavedProduct = userAction(productModel, "savedProducts");
export const addSavedArticle = userAction(articleModel, "savedArticles");
export const addFavouriteArticle = userAction(articleModel, "likedArticles");
