import express from "express";
import { checkSchema } from "express-validator";
import multer from "multer";
import * as authController from "../controllers/authController.js";
import {
  emailValidationSchema,
  loginValidationSchema,
  passwordValidationSchema,
  registerValidationSchema,
} from "../validations/authValidator.js";
import handleValidation from "../middlewares/handleValidation.js";

const authRouter = express.Router();

authRouter.use(multer({ storage: multer.memoryStorage() }).none());
authRouter.post(
  "/signup",
  checkSchema(registerValidationSchema),
  handleValidation,
  authController.signup
);
authRouter.post(
  "/login",
  checkSchema(loginValidationSchema),
  handleValidation,
  authController.login
);
authRouter.get("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
authRouter.post(
  "/forgot-password",
  checkSchema(emailValidationSchema),
  handleValidation,
  authController.forgotPassword
);

authRouter.patch(
  "/reset-password/:token",
  checkSchema(passwordValidationSchema),
  handleValidation,
  authController.resetPassword
);

export default authRouter;
