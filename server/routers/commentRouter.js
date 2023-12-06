import express from "express";
import * as commentController from "../controllers/commentController.js";
import restrictTo from "../middlewares/restrictTo.js";
import protect from "../middlewares/protect.js";
import prefillReqBody from "../middlewares/prefillReqBody.js";
import {
  commentValidationSchema,
  postCommentValidationSchema,
} from "../validations/commentValidator.js";
import { idValidationSchema } from "../validations/idValidation.js";
import { checkSchema } from "express-validator";
import multer from "multer";

const commentRouter = express.Router({ mergeParams: true });

commentRouter.use(multer({ storage: multer.memoryStorage() }).none());
commentRouter
  .route("/")
  .get(commentController.getAllComments)
  .post(
    protect(),
    prefillReqBody({
      userID: (req) => req.user._id,
      articleID: (req) => req.params.articleID,
    }),
    checkSchema(postCommentValidationSchema),
    commentController.addComment
  );

commentRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), commentController.getComment)
  .patch(
    protect(),
    checkSchema(commentValidationSchema),
    commentController.updateComment
  )
  .delete(protect(), checkSchema(idValidationSchema), commentController.deleteComment);

export default commentRouter;
