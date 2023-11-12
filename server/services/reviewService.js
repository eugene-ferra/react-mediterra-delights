import AppError from "../utils/appError.js";
import reviewModel from "../models/reviewModel.js";
import { ReviewDTO } from "../dto/reviewDTO.js";
import productModel from "../models/productModel.js";

export class reviewService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await reviewModel
      .find(filterObj)
      .sort(sortObj)
      .skip(--page * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }

    return data.map((item) => new ReviewDTO(item));
  }

  static async getOne({ id, populateObj }) {
    const doc = await reviewModel.findById(id).populate(populateObj).exec();

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new ReviewDTO(doc)];
  }

  static async addOne(data) {
    const isExist = await productModel.findById(data.productID);
    if (!isExist) throw new AppError("Product with provided id does not exists!", 400);

    const doc = await reviewModel.create(data);
    return [new ReviewDTO(doc)];
  }

  static async updateOne(id, data) {
    const doc = await reviewModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new ReviewDTO(doc)];
  }

  static async deleteOne(id) {
    const doc = await reviewModel.findByIdAndDelete(id);

    if (!doc) throw new AppError("There aren't documents with this id!", 404);
  }
}
