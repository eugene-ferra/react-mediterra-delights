import AppError from "../utils/appError.js";
import reviewModel from "../models/reviewModel.js";
import ReviewDTO from "../dto/reviewDTO.js";
import productModel from "../models/productModel.js";
import userService from "./userService.js";

export default class reviewService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await reviewModel
      .find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length || data.length === 0) {
      throw new AppError("No documents match the current filters!", 404);
    }

    const docs = await reviewModel.countDocuments(filterObj);

    return [{ pages: Math.ceil(docs / limit) }, data.map((item) => new ReviewDTO(item))];
  }

  static async getOne({ id, productID, populateObj }) {
    const doc = await reviewModel
      .find({ _id: id, productID: productID || { $exists: true } })
      .populate(populateObj)
      .exec();

    if (doc.length === 0)
      throw new AppError("There aren't documents with this id!", 404);

    return [new ReviewDTO(doc[0])];
  }

  static async addOne(data) {
    const isExist = await productModel.findById(data.productID);
    if (!isExist) throw new AppError("Product with provided id does not exists!", 400);

    const doc = await reviewModel.create(data);
    return [new ReviewDTO(doc)];
  }

  static async updateOne(id, data, userId, role) {
    if (role === "user") {
      const user = await userService.getOne({ id: userId });
      if (!user[0].addedReviews.includes(id))
        throw new AppError("You can't change other reviews!", 403);

      data.isModerated = false;
    } else {
      delete data.review;
      delete data.rating;
    }

    const doc = await reviewModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new ReviewDTO(doc)];
  }

  static async deleteOne(id, role, userId) {
    if (role === "user") {
      const user = await userService.getOne({ id: userId });
      if (!user[0].addedReviews.includes(id))
        throw new AppError("You can't delete other reviews!", 403);
    }
    const doc = await reviewModel.findByIdAndDelete(id);

    if (!doc) throw new AppError("There aren't documents with this id!", 404);
  }

  static getOptions() {
    const options = {
      rating: reviewModel.schema.path("rating").options.enum.values,
    };

    return options;
  }
}
