import express from "express";
import { checkSchema } from "express-validator";
import * as workerController from "../controllers/workerController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import {
  workerValidationSchema,
  workerValidationStrictSchema,
} from "../validations/workerValidator.js";
import idValidationSchema from "../validations/idValidation.js";
import imageUpload from "../middlewares/imageUpload.js";
import fileValidation from "../middlewares/fileValidation.js";
import handleValidation from "../middlewares/handleValidation.js";

const workerRouter = express.Router();

workerRouter
  .route("/")
  .get(workerController.getWorkers)
  .post(
    protect(),
    restrictTo("admin"),
    imageUpload.fields([{ name: "photo", maxCount: 1 }]),
    checkSchema(workerValidationStrictSchema),
    fileValidation([{ path: "photo", msg: "Будь-ласка, додайте фото працівника!" }]),
    handleValidation,
    workerController.addWorker
  );

workerRouter.get("/options", workerController.getOptions);

workerRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), handleValidation, workerController.getWorker)
  .patch(
    protect(),
    restrictTo("admin"),
    imageUpload.fields([{ name: "photo", maxCount: 1 }]),
    checkSchema(workerValidationSchema),
    handleValidation,
    workerController.updateWorker
  )
  .delete(
    protect(),
    restrictTo("admin"),
    checkSchema(idValidationSchema),
    handleValidation,
    workerController.deleteWorker
  );

export default workerRouter;
