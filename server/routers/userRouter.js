import express from "express";
import * as userController from "../controllers/userController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.use(protect, restrictTo("user"));

userRouter.route("/").get(userController.getUsers);
userRouter.route("/me").get(userController.setUserId, userController.getMe);

userRouter.post("/:userID/savedProducts", userController.addSavedProduct);
userRouter.post("/:userID/likedArticles", userController.addFavouriteArticle);
userRouter.post("/:userID/savedArticles", userController.addSavedArticle);

export default userRouter;
