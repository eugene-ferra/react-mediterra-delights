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
    reviewController.presetStatus,
    reviewController.addReview
  );

reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .patch(protect, reviewController.checkUpdate, reviewController.updateReview)
  .delete(
    protect,
    reviewController.checkUpdate,
    reviewController.presetStatus,
    reviewController.deleteReview
  );

export default reviewRouter;
