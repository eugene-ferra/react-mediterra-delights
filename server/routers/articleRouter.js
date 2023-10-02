import express from "express";
import * as articleController from "../controllers/articleController.js";
import commentRouter from "./commentRouter.js";

const articleRouter = express.Router();

articleRouter
  .route("/")
  .get(articleController.getArticles)
  .post(articleController.addArticle);

articleRouter
  .route("/:id")
  .get(articleController.getArticle)
  .patch(articleController.updateArticle)
  .delete(articleController.deleteArticle);

articleRouter.use("/:articleID/comments", commentRouter);

export default articleRouter;
