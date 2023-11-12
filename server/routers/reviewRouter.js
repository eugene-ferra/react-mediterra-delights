import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import prefillReqBody from "../middlewares/prefillReqBody.js";
import {
  reviewValidationSchema,
  postReviewValidationSchema,
} from "../validations/reviewValidation.js";
import { checkSchema } from "express-validator";
import { idValidationSchema } from "../validations/idValidation.js";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    protect(),
    restrictTo("user"),
    prefillReqBody({
      userID: (req) => req.user._id,
      productID: (req) => req.params.productID,
    }),
    checkSchema(postReviewValidationSchema),
    reviewController.addReview
  );

reviewRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), reviewController.getReview)
  .patch(protect(), checkSchema(reviewValidationSchema), reviewController.updateReview)
  .delete(protect(), checkSchema(idValidationSchema), reviewController.deleteReview);

export default reviewRouter;
