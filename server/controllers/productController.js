import productModel from "../models/productModel.js";
import * as factory from "./handleFactory.js";

export const getProducts = factory.getAll(productModel, { path: "reviews" });
export const addProduct = factory.addOne(productModel);
export const getProduct = factory.getOne(productModel, { path: "reviews" });
export const updateProduct = factory.updateOne(productModel);
export const deleteProduct = factory.deleteOne(productModel);
