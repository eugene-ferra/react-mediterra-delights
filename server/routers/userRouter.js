import express from "express";
import * as userController from "../controllers/userController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import { imageUpload } from "../middlewares/imageUpload.js";
import { checkSchema } from "express-validator";
import { idValidationSchema } from "../validations/idValidation.js";

const userRouter = express.Router();

userRouter.use(protect());

userRouter
  .route("/me")
  .get(userController.getMe)
  .patch(imageUpload.single("avatar"), userController.updateUserInfo)
  .delete(userController.deleteUser);

userRouter
  .post("/me/savedProducts", userController.saveProduct)
  .delete("/me/savedProducts/:id", userController.discardProduct);

userRouter
  .post("/me/likedArticles", userController.likeArticle)
  .delete("/me/likedArticles/:id", userController.unlikeArticle);

userRouter
  .post("/me/savedArticles", userController.saveArticle)
  .delete("/me/savedArticles/:id", userController.discardArticle);

userRouter
  .post("/me/cart", userController.addToCart)
  .patch("/me/cart/:id", userController.updateCartItem)
  .delete("/me/cart/:id", userController.deleteFromCart);

userRouter.route("/").get(restrictTo("admin"), userController.getUsers);

userRouter
  .route("/:id")
  .patch(
    restrictTo("admin"),
    checkSchema(idValidationSchema),
    userController.changeRole
  );

export default userRouter;
