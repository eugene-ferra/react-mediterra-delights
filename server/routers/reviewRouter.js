import express from "express";
import * as reviewController from "../controllers/reviewController.js";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.setReviewsIds, reviewController.addReview);

reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

export default reviewRouter;
