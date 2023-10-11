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
    commentController.presetStatus,
    commentController.addComment
  );

commentRouter
  .route("/:id")
  .get(commentController.getComment)
  .patch(
    protect,
    commentController.checkUpdate,
    commentController.presetStatus,
    commentController.updateComment
  )
  .delete(
    protect,
    commentController.checkUpdate,
    commentController.deleteComment
  );

export default commentRouter;
