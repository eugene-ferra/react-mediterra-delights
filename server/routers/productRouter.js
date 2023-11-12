import express from "express";
import * as productController from "../controllers/ProductController.js";
import reviewRouter from "./reviewRouter.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import { checkSchema } from "express-validator";
import {
  productValidationSchema,
  productValidationStrictSchema,
} from "../validations/productValidation.js";
import { idValidationSchema } from "../validations/idValidation.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getProducts)
  .post(
    protect(),
    restrictTo("admin"),
    checkSchema(productValidationStrictSchema),
    productController.addProduct
  );

productRouter
  .route("/:id")
  .get(checkSchema(idValidationSchema), productController.getProduct)
  .patch(
    protect(),
    restrictTo("admin"),
    checkSchema(productValidationSchema),
    productController.updateProduct
  )
  .delete(
    protect(),
    restrictTo("admin"),
    checkSchema(idValidationSchema),
    productController.deleteProduct
  );

productRouter.use("/:productID/reviews", reviewRouter);

export default productRouter;
