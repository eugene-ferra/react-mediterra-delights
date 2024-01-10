import multer from "multer";
import AppError from "../utils/appError.js";

const whitelist = ["image/png", "image/jpeg", "image/jpg"];

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new AppError(`${file.originalname} : this file is not allowed!`, 400));
    }

    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
    fieldSize: 1024 * 1024 * 10,
  },
});
