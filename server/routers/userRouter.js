import express from "express";
import * as userController from "../controllers/userController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import { idValidationSchema } from "../validations/idValidation.js";
import { checkSchema } from "express-validator";

const userRouter = express.Router();

userRouter.route("/").get(protect(), restrictTo("admin"), userController.getUsers);

userRouter.use(protect());
userRouter.route("/me").get(userController.getMe);
userRouter
  .post(
    "/:userID/savedProducts",
    checkSchema(idValidationSchema),
    userController.saveProduct
  )
  .delete(
    "/:userID/savedProducts/:id",
    checkSchema(idValidationSchema),
    userController.discardProduct
  );

userRouter
  .post(
    "/:userID/likedArticles",
    checkSchema(idValidationSchema),
    userController.likeArticle
  )
  .delete(
    "/:userID/likedArticles/:id",
    checkSchema(idValidationSchema),
    userController.unlikeArticle
  );

userRouter
  .post(
    "/:userID/savedArticles",
    checkSchema(idValidationSchema),
    userController.saveArticle
  )
  .delete(
    "/:userID/savedArticles/:id",
    checkSchema(idValidationSchema),
    userController.discardArticle
  );

export default userRouter;
