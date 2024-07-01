import express from "express";
import { checkSchema } from "express-validator";
import multer from "multer";
import * as reviewController from "../controllers/reviewController.js";
import protect from "../middlewares/protect.js";
import prefillReqBody from "../middlewares/prefillReqBody.js";
import handleValidation from "../middlewares/handleValidation.js";
import {
  reviewValidationSchema,
  postReviewValidationSchema,
} from "../validations/reviewValidation.js";
import idValidationSchema from "../validations/idValidation.js";

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
    handleValidation,
    reviewController.addReview
  );

reviewRouter.route("/options").get(reviewController.getOptions);

reviewRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), handleValidation, reviewController.getReview)
  .patch(
    protect(),
    checkSchema(reviewValidationSchema),
    handleValidation,
    reviewController.updateReview
  )
  .delete(
    protect(),
    checkSchema(idValidationSchema),
    handleValidation,
    reviewController.deleteReview
  );

export default reviewRouter;
