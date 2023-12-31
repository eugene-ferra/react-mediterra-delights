import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import protect from "../middlewares/protect.js";
import prefillReqBody from "../middlewares/prefillReqBody.js";
import {
  reviewValidationSchema,
  postReviewValidationSchema,
} from "../validations/reviewValidation.js";
import { checkSchema } from "express-validator";
import { idValidationSchema } from "../validations/idValidation.js";
import multer from "multer";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(multer({ storage: multer.memoryStorage() }).none());
reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    protect(),
    prefillReqBody({
      userID: (req) => req.user._id,
      productID: (req) => req.params.productID,
    }),
    checkSchema(postReviewValidationSchema),
    reviewController.addReview
  );

reviewRouter.route("/options").get(reviewController.getOptions);

reviewRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), reviewController.getReview)
  .patch(protect(), checkSchema(reviewValidationSchema), reviewController.updateReview)
  .delete(protect(), checkSchema(idValidationSchema), reviewController.deleteReview);

export default reviewRouter;
