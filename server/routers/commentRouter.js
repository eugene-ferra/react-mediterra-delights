import express from "express";
import multer from "multer";
import { checkSchema } from "express-validator";
import * as commentController from "../controllers/commentController.js";
import protect from "../middlewares/protect.js";
import prefillReqBody from "../middlewares/prefillReqBody.js";
import {
  commentValidationSchema,
  postCommentValidationSchema,
} from "../validations/commentValidator.js";
import idValidationSchema from "../validations/idValidation.js";
import handleValidation from "../middlewares/handleValidation.js";

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
    handleValidation,
    commentController.addComment
  );

commentRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), handleValidation, commentController.getComment)
  .patch(
    protect(),
    checkSchema(commentValidationSchema),
    handleValidation,
    commentController.updateComment
  )
  .delete(
    protect(),
    checkSchema(idValidationSchema),
    handleValidation,
    commentController.deleteComment
  );

export default commentRouter;
