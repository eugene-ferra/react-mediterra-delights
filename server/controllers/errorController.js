import multer from "multer";
import AppError from "../utils/appError.js";
import mongoose from "mongoose";

const handleValidationErrorDB = (err) => {
  return new AppError(err.message, 400);
};

const handleDublicateKeysErrorDB = (err) => {
  const value = JSON.stringify(err.keyValue).match(/(["'])(\\?.)*?\1/)[0];
  const message = `Dublicate value ${value}. Use another one!`;

  return new AppError(message, 409);
};

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid type of ${err.path}!`, 400);
};

const handleJWTError = (err) => {
  return new AppError("Invalid authorization token!", 400);
};

const handleTokenExpiredError = (err) => {
  return new AppError("Authorization token has been expired!", 401);
};

const handleMulterError = (err) => {
  return new AppError(
    `${err.field ? err.field + " : " : ""}${err.message.toLowerCase()}`,
    400
  );
};

const sendError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

export default function (err, req, res, next) {
  let error;
  console.log(err);

  if (err.name === "JsonWebTokenError") error = handleJWTError(err);
  if (err.name === "TokenExpiredError") error = handleTokenExpiredError(err);
  if (err instanceof mongoose.Error.CastError) error = handleCastErrorDB(err);
  if (err instanceof mongoose.Error.ValidationError)
    error = handleValidationErrorDB(err);
  if (err.code === 11000) error = handleDublicateKeysErrorDB(err);
  if (err instanceof multer.MulterError) error = handleMulterError(err);

  error ? sendError(error, req, res) : sendError(err, req, res);
}
