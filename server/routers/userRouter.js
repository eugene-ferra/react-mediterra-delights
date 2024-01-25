import express from "express";
import * as userController from "../controllers/userController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import { imageUpload } from "../middlewares/imageUpload.js";
import { checkSchema } from "express-validator";
import { idValidationSchema } from "../validations/idValidation.js";
import {
  cartValidationSchema,
  userValidationSchema,
} from "../validations/userValidation.js";
import multer from "multer";

const userRouter = express.Router();

userRouter.use(protect());
// userRouter.use(multer({ storage: multer.memoryStorage() }).none());
userRouter
  .route("/me")
  .get(userController.getMe)
  .patch(
    imageUpload.single("avatar"),
    checkSchema(userValidationSchema),
    userController.updateUserInfo
  )
  .delete(userController.deleteUser);

userRouter
  .post("/me/savedProducts", checkSchema(idValidationSchema), userController.saveProduct)
  .delete(
    "/me/savedProducts/:id",
    checkSchema(idValidationSchema),
    userController.discardProduct
  );

userRouter
  .post("/me/likedArticles", checkSchema(idValidationSchema), userController.likeArticle)
  .delete(
    "/me/likedArticles/:id",
    checkSchema(idValidationSchema),
    userController.unlikeArticle
  );

userRouter
  .post("/me/savedArticles", checkSchema(idValidationSchema), userController.saveArticle)
  .delete(
    "/me/savedArticles/:id",
    checkSchema(idValidationSchema),
    userController.discardArticle
  );

userRouter
  .post("/me/cart", checkSchema(cartValidationSchema), userController.addToCart)
  .patch(
    "/me/cart/:id",
    checkSchema(cartValidationSchema),
    userController.updateCartItem
  )
  .delete(
    "/me/cart/:id",
    checkSchema(idValidationSchema),
    userController.deleteFromCart
  );

userRouter.route("/").get(restrictTo("admin"), userController.getUsers);

userRouter
  .route("/:id")
  .patch(
    restrictTo("admin"),
    checkSchema(idValidationSchema),
    userController.changeRole
  );

export default userRouter;
