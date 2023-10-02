import express from "express";
import * as commentController from "../controllers/commentController.js";

const commentRouter = express.Router({ mergeParams: true });

commentRouter
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.setArticlesIds, commentController.addComment);

commentRouter
  .route("/:id")
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

export default commentRouter;
