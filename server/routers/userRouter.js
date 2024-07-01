import express from "express";
import { checkSchema } from "express-validator";
import * as userController from "../controllers/userController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import imageUpload from "../middlewares/imageUpload.js";
import idValidationSchema from "../validations/idValidation.js";
import {
  cartValidationSchema,
  userValidationSchema,
} from "../validations/userValidation.js";
import handleValidation from "../middlewares/handleValidation.js";

const userRouter = express.Router();

userRouter.use(protect());
userRouter
  .route("/me")
  .get(userController.getMe)
  .patch(
    imageUpload.single("avatar"),
    checkSchema(userValidationSchema),
    handleValidation,
    userController.updateUserInfo
  )
  .delete(userController.deleteUser);

userRouter
  .get("/me/savedProducts", userController.getSavedProducts)
  .post(
    "/me/savedProducts",
    checkSchema(idValidationSchema),
    handleValidation,
    userController.saveProduct
  )
  .delete(
    "/me/savedProducts/:id",
    checkSchema(idValidationSchema),
    handleValidation,
    userController.discardProduct
  );

userRouter
  .post(
    "/me/likedArticles",
    checkSchema(idValidationSchema),
    handleValidation,
    userController.likeArticle
  )
  .delete(
    "/me/likedArticles/:id",
    checkSchema(idValidationSchema),
    handleValidation,
    userController.unlikeArticle
  );

userRouter
  .get("/me/savedArticles", userController.getSavedArticles)
  .post(
    "/me/savedArticles",
    checkSchema(idValidationSchema),
    handleValidation,
    userController.saveArticle
  )
  .delete(
    "/me/savedArticles/:id",
    checkSchema(idValidationSchema),
    handleValidation,
    userController.discardArticle
  );

userRouter
  .post(
    "/me/cart",
    checkSchema(cartValidationSchema),
    handleValidation,
    userController.addToCart
  )
  .patch(
    "/me/cart/:id",
    checkSchema(cartValidationSchema),
    handleValidation,
    userController.updateCartItem
  )
  .delete(
    "/me/cart/:id",
    checkSchema(idValidationSchema),
    handleValidation,
    userController.deleteFromCart
  )
  .delete("/me/cart", userController.clearCart);

userRouter.route("/").get(restrictTo("admin"), userController.getUsers);

userRouter.get("/me/orders", userController.getOrderHistory);

userRouter
  .route("/:id")
  .patch(
    restrictTo("admin"),
    checkSchema(idValidationSchema),
    handleValidation,
    userController.changeRole
  );

export default userRouter;
