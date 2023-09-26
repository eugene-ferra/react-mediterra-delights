import reviewModel from "../models/reviewModel.js";
import * as factory from "./handleFactory.js";

export const setReviewsIds = (req, res, next) => {
  if (!req.body.productID) req.body.productID = req.params.id;
  //FIXME: TEMPORARY!!! MUST BE REAL USER ID FROM DB
  if (!req.body.userID) req.body.userID = "650ae6b6cb7174a9a959fe51";
  next();
};

export const addReview = factory.addOne(reviewModel);
export const getAllReviews = factory.getAll(reviewModel, {
  path: "product",
  select: "-reviews",
});
export const getReview = factory.getOne(reviewModel, {
  path: "product",
  select: "-reviews",
});
export const updateReview = factory.updateOne(reviewModel);
export const deleteReview = factory.deleteOne(reviewModel);
