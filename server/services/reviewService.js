import AppError from "../utils/appError.js";
import reviewModel from "../models/reviewModel.js";
import ReviewDTO from "../dto/reviewDTO.js";
import UserService from "./userService.js";
import ProductService from "./productService.js";
import addLinks from "../utils/addLinks.js";

export default class reviewService {
  async countPages(filterObj, limit = 5) {
    /* count all pages based on filters and items per page (limit) */

    const docs = await reviewModel.countDocuments(filterObj);
    return Math.ceil(docs / limit);
  }

  async getAll({ filterObj, sortObj, page = 1, limit = 15 }) {
    /* get all reviews with pagination, sorting and filtering */

    const data = await reviewModel
      .find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "userID",
        model: "User",
      });

    if (!data.length || data.length === 0) {
      throw new AppError("Відгуків за даним запитом не знайдено!", 404);
    }

    return data.map((item) => {
      const transformedItem = new ReviewDTO(item);

      transformedItem.user = addLinks(transformedItem.user, "avatar");
      return transformedItem;
    });
  }

  async getOne({ id, productID }) {
    /* get one review by id and (optional) productID */

    const doc = await reviewModel
      .findOne({ _id: id, productID: productID || { $exists: true } })
      .populate({ path: "userID", model: "User" })
      .exec();

    if (!doc) throw new AppError("Даний відгук не знайдено!", 404);

    const transformedItem = new ReviewDTO(doc);
    transformedItem.user = addLinks(transformedItem.user, "avatar");

    return transformedItem;
  }

  async addOne(data) {
    /* add new review */

    //test product existence
    const productService = new ProductService();
    await productService.getOne(data.productID);

    data.isModerated = false;
    const doc = await reviewModel.create(data);

    const transformedItem = new ReviewDTO(doc);
    transformedItem.user = addLinks(transformedItem.user, "avatar");

    return transformedItem;
  }

  async checkUserCanChangeReview(reviewId, userId) {
    /* check if user can change review */

    const userService = new UserService();

    const user = await userService.getOne(userId);
    if (!user.addedReviews.includes(reviewId))
      throw new AppError("Ви не можете змінювати відгуки інших користувачів!", 403);

    return true;
  }

  async updateOne(reviewId, data) {
    /* update review for user */

    const doc = await reviewModel.findByIdAndUpdate(reviewId, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new AppError("Такого відгуку не знайдено!", 404);

    const transformedItem = new ReviewDTO(doc);
    transformedItem.user = addLinks(transformedItem.user, "avatar");

    return transformedItem;
  }

  async deleteOne(id) {
    /* delete review */
    const doc = await reviewModel.findByIdAndDelete(id);

    if (!doc) throw new AppError("Такого відгуку не існує!", 404);
  }

  getOptions() {
    /* get all options for review */

    const options = {
      rating: reviewModel.schema.path("rating").options.enum.values,
    };

    return options;
  }
}
