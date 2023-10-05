import express from "express";
import * as productController from "../controllers/ProductController.js";
import reviewRouter from "./reviewRouter.js";
import { protect, restrictTo } from "../controllers/authController.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getProducts)
  .post(protect, restrictTo("admin"), productController.addProduct);

productRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(protect, restrictTo("admin"), productController.updateProduct)
  .delete(protect, restrictTo("admin"), productController.deleteProduct);

productRouter.use("/:productID/reviews", reviewRouter);

export default productRouter;
