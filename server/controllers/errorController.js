import multer from "multer";
import mongoose from "mongoose";
import AppError from "../utils/appError.js";

const handleValidationErrorDB = (err) => new AppError(err.message, 400);

const handleDublicateKeysErrorDB = (err) => {
  const message = `Запис '${
    Object.values(err.keyValue)[0]
  }' вже існує! Спробуйте ще раз!`;

  return new AppError(message, 409);
};

const handleCastErrorDB = (err) => new AppError(`Invalid type of ${err.path}!`, 400);

const handleJWTError = () => new AppError("Invalid authorization token!", 400);

const handleTokenExpiredError = () =>
  new AppError("Authorization token has been expired!", 401);

const handleMulterError = (err) =>
  new AppError(`${err.field ? `${err.field} : ` : ""}${err.message.toLowerCase()}`, 400);

const sendError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

export default function (err, req, res, next) {
  let error;

  if (err.name === "JsonWebTokenError") error = handleJWTError(err);
  if (err.name === "TokenExpiredError") error = handleTokenExpiredError(err);
  if (err instanceof mongoose.Error.CastError) error = handleCastErrorDB(err);
  if (err instanceof mongoose.Error.ValidationError)
    error = handleValidationErrorDB(err);
  if (err.code === 11000) error = handleDublicateKeysErrorDB(err);
  if (err instanceof multer.MulterError) error = handleMulterError(err);

  if (error) {
    sendError(error, req, res);
  } else {
    sendError(err, req, res);
  }
}
