import express from "express";
import * as authController from "../controllers/authController.js";
import {
  emailValidationSchema,
  loginValidationSchema,
  passwordValidationSchema,
  registerValidationSchema,
} from "../validations/authValidator.js";
import { checkSchema } from "express-validator";
import multer from "multer";

const authRouter = express.Router();

authRouter.use(multer({ storage: multer.memoryStorage() }).none());
authRouter.post("/signup", checkSchema(registerValidationSchema), authController.signup);
authRouter.post("/login", checkSchema(loginValidationSchema), authController.login);
authRouter.get("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
authRouter.post(
  "/forgot-password",
  checkSchema(emailValidationSchema),
  authController.forgotPassword
);

authRouter.patch(
  "/reset-password/:token",
  checkSchema(passwordValidationSchema),
  authController.resetPassword
);

export default authRouter;
