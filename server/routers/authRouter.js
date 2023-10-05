import express from "express";
import * as authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.logIn);
authRouter.post("/logout", authController.logOut);

export default authRouter;
