import express from "express";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/").get(userController.getUsers);

userRouter.post("/:userID/likedProducts", userController.addFavouriteProduct);
userRouter.post("/:userID/likedArticles", userController.addFavouriteArticle);

export default userRouter;
