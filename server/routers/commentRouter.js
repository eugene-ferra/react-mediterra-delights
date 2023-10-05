import express from "express";
import * as commentController from "../controllers/commentController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const commentRouter = express.Router({ mergeParams: true });

commentRouter
  .route("/")
  .get(commentController.getAllComments)
  .post(
    protect,
    restrictTo("user"),
    commentController.setArticlesIds,
    commentController.addComment
  );

commentRouter
  .route("/:id")
  .get(commentController.getComment)
  .patch(protect, restrictTo("user"), commentController.updateComment)
  .delete(protect, restrictTo("user"), commentController.deleteComment);

export default commentRouter;
