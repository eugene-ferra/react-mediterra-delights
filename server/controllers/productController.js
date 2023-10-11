import productModel from "../models/productModel.js";
import * as factory from "./handleFactory.js";

export const getProducts = factory.getAll(productModel, {
  path: "reviews",
  match: { isModerated: true },
});
export const addProduct = factory.addOne(productModel);
export const getProduct = factory.getOne(productModel, {
  path: "reviews",
  match: { isModerated: true },
});
export const updateProduct = factory.updateOne(productModel);
export const deleteProduct = factory.deleteOne(productModel);
