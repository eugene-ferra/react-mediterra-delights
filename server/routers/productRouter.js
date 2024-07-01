import express from "express";
import { checkSchema } from "express-validator";
import * as productController from "../controllers/productController.js";
import reviewRouter from "./reviewRouter.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import {
  productValidationSchema,
  productValidationStrictSchema,
} from "../validations/productValidation.js";
import idValidationSchema from "../validations/idValidation.js";
import imageUpload from "../middlewares/imageUpload.js";
import handleValidation from "../middlewares/handleValidation.js";
import fileValidation from "../middlewares/fileValidation.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getProducts)
  .post(
    protect(),
    restrictTo("admin"),
    imageUpload.fields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    checkSchema(productValidationStrictSchema),
    fileValidation([
      { path: "imgCover", msg: "Будь-ласка, додайте зображення до товару!" },
    ]),
    handleValidation,
    productController.addProduct
  );

productRouter.route("/options").get(productController.getOptions);

productRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    protect(),
    restrictTo("admin"),
    imageUpload.fields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    checkSchema(productValidationSchema),
    handleValidation,
    productController.updateProduct
  )
  .delete(
    protect(),
    restrictTo("admin"),
    checkSchema(idValidationSchema),
    handleValidation,
    productController.deleteProduct
  );

productRouter.use("/:productID/reviews", reviewRouter);

export default productRouter;
