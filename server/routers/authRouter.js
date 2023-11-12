import express from "express";
import * as authController from "../controllers/authController.js";
import {
  loginValidationSchema,
  registerValidationSchema,
  tokenValidationSchema,
} from "../validations/authValidator.js";
import { checkSchema } from "express-validator";

const authRouter = express.Router();

authRouter.post("/signup", checkSchema(registerValidationSchema), authController.signup);
authRouter.post("/login", checkSchema(loginValidationSchema), authController.login);
authRouter.get("/logout", checkSchema(tokenValidationSchema), authController.logout);
authRouter.get("/refresh", checkSchema(tokenValidationSchema), authController.refresh);

export default authRouter;
