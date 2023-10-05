import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    protect,
    restrictTo("user"),
    reviewController.setReviewsIds,
    reviewController.addReview
  );

reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .patch(protect, restrictTo("user"), reviewController.updateReview)
  .delete(protect, restrictTo("user"), reviewController.deleteReview);

export default reviewRouter;
