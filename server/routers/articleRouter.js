import express from "express";
import * as articleController from "../controllers/articleController.js";
import commentRouter from "./commentRouter.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import {
  articleValidationSchema,
  articleValidationStrictSchema,
} from "../validations/articleValidator.js";
import { idValidationSchema } from "../validations/idValidation.js";
import { checkSchema } from "express-validator";

const articleRouter = express.Router();

articleRouter
  .route("/")
  .get(articleController.getArticles)
  .post(
    protect(),
    restrictTo("admin"),
    checkSchema(articleValidationStrictSchema),
    articleController.addArticle
  );

articleRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), articleController.getArticle)
  .patch(
    protect(),
    restrictTo("admin"),
    checkSchema(articleValidationSchema),
    articleController.updateArticle
  )
  .delete(
    protect(),
    restrictTo("admin"),
    checkSchema(idValidationSchema),
    articleController.deleteArticle
  );

articleRouter.use("/:articleID/comments", commentRouter);

export default articleRouter;
