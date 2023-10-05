import express from "express";
import * as articleController from "../controllers/articleController.js";
import commentRouter from "./commentRouter.js";
import { protect, restrictTo } from "../controllers/authController.js";

const articleRouter = express.Router();

articleRouter
  .route("/")
  .get(articleController.getArticles)
  .post(
    protect,
    restrictTo("admin"),
    articleController.setViews,
    articleController.addArticle
  );

articleRouter
  .route("/:id")
  .get(articleController.getArticle)
  .patch(protect, restrictTo("admin"), articleController.updateArticle)
  .delete(protect, restrictTo("admin"), articleController.deleteArticle);

articleRouter.use("/:articleID/comments", commentRouter);

export default articleRouter;
