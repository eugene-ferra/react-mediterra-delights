import userModel from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll } from "./handleFactory.js";
import productModel from "../models/productModel.js";
import AppError from "../utils/appError.js";
import articleModel from "../models/articleModel.js";

export const getUsers = getAll(userModel, {
  path: "likedProducts likedArticles addedComments addedReviews",
});

export const addFavouriteProduct = catchAsync(async (req, res, next) => {
  const productID = req.body.productID;
  const userID = req.params.userID;

  const user = await userModel.findById(userID);
  if (user.likedProducts.includes(productID)) {
    return next(new AppError("Product already added to liked!", 400));
  }

  const product = await productModel.findById(productID);
  if (!product) return next(new AppError("Invalid productID", 400));

  const doc = await userModel.findByIdAndUpdate(userID, {
    $push: { likedProducts: productID },
  });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

export const addFavouriteArticle = catchAsync(async (req, res, next) => {
  const articleID = req.body.articleID;
  const userID = req.params.userID;

  const user = await userModel.findById(userID);
  if (user.likedArticles.includes(articleID)) {
    return next(new AppError("Article already added to liked!", 400));
  }

  const article = await articleModel.findById(articleID);
  if (!article) return next(new AppError("Invalid articleID!", 400));

  const doc = await userModel.findByIdAndUpdate(userID, {
    $push: { likedArticles: articleID },
  });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});
