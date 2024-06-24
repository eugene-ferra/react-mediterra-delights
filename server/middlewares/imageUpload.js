import multer from "multer";
import AppError from "../utils/appError.js";

const whitelist = ["image/png", "image/jpeg", "image/jpg"];

const imageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(
        new AppError(
          `${file.originalname} : ви не можете прикріпити файл такого формату!`,
          400
        )
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
    fieldSize: 1024 * 1024 * 10,
  },
});

export default imageUpload;
