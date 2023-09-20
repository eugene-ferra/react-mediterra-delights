import AppError from "../utils/appError.js";
import mongoose from "mongoose";

const handleValidationErrorDB = (err) => {
  return new AppError(err.message, 400);
};

const handleDublicateKeysErrorDB = (err) => {
  const value = JSON.stringify(err.keyValue).match(/(["'])(\\?.)*?\1/)[0];
  const message = `Dublicate value ${value}. Use another one!`;

  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid type of ${err.path}!`, 400);
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

  if (err instanceof mongoose.Error.CastError) error = handleCastErrorDB(err);
  if (err instanceof mongoose.Error.ValidationError)
    error = handleValidationErrorDB(err);
  if (err.code === 11000) error = handleDublicateKeysErrorDB(err);

  error ? sendError(error, req, res) : sendError(err, req, res);
}
