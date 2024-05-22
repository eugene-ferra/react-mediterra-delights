import express from "express";
import * as workerController from "../controllers/workerController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import {
  workerValidationSchema,
  workerValidationStrictSchema,
} from "../validations/workerValidator.js";
import { idValidationSchema } from "../validations/idValidation.js";
import { checkSchema } from "express-validator";
import { imageUpload } from "../middlewares/imageUpload.js";

const workerRouter = express.Router();

workerRouter
  .route("/")
  .get(workerController.getWorkers)
  .post(
    protect(),
    restrictTo("admin"),
    imageUpload.fields([{ name: "photo", maxCount: 1 }]),
    checkSchema(workerValidationStrictSchema),
    workerController.addWorker
  );

workerRouter.get("/options", workerController.getOptions);

workerRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), workerController.getWorker)
  .patch(
    protect(),
    restrictTo("admin"),
    imageUpload.fields([{ name: "photo", maxCount: 1 }]),
    checkSchema(workerValidationSchema),
    workerController.updateWorker
  )
  .delete(
    protect(),
    restrictTo("admin"),
    checkSchema(idValidationSchema),
    workerController.deleteWorker
  );

export default workerRouter;
