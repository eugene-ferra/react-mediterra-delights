import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

dotenv.config({ path: "./.env" });

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

function createSendToken(user, statusCode, req, res) {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
}

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await userModel.create(req.body);

  createSendToken(newUser, 201, req, res);
});

export const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //error if no email or password in req.body
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");

  //error if invalid login data
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, req, res);
});

export const logOut = (req, res) => {
  //reset cookie
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 100 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
