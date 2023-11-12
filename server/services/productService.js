import AppError from "../utils/appError.js";
import productModel from "../models/productModel.js";
import { ProductDTO } from "../dto/productDTO.js";
import lodash from "lodash";

export class productService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await productModel
      .find(filterObj)
      .sort(sortObj)
      .skip(--page * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }

    return data.map((item) => new ProductDTO(item));
  }

  static async getOne({ id, populateObj }) {
    const doc = await productModel.findById(id).populate(populateObj).exec();

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new ProductDTO(doc)];
  }

  static async addOne(data) {
    const doc = await productModel.create(data);
    return [new ProductDTO(doc)];
  }

  static async updateOne(id, data) {
    let doc = await productModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    doc = lodash.merge(doc, data);
    await doc.save();

    return [new ProductDTO(doc)];
  }

  static async deleteOne(id) {
    const doc = await productModel.findByIdAndDelete(id);

    if (!doc) throw new AppError("There aren't documents with this id!", 404);
  }
}
