import express from "express";
import * as productController from "../controllers/ProductController.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getProducts)
  .post(productController.addProduct);

productRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default productRouter;
