import AppError from "../utils/appError.js";
import commentModel from "../models/commentModel.js";
import CommentDTO from "../dto/commentDTO.js";
import addLinks from "../utils/addLinks.js";
import ArticleService from "./articleService.js";
import UserService from "./userService.js";

export default class commentService {
  async countPages(filterObj, limit = 15) {
    /* count all pages based on filters and items per page (limit) */

    const docs = await commentModel.countDocuments(filterObj);
    return Math.ceil(docs / limit);
  }

  async checkUserCanChangeComment(reviewId, userId) {
    /* check if user can change review */

    const userService = new UserService();

    const user = await userService.getOne(userId);
    if (!user.addedReviews.includes(reviewId))
      throw new AppError("Ви не можете змінювати коментарі інших користувачів!", 403);

    return true;
  }

  async getAll({ filterObj, sortObj, page = 1, limit = 15 }) {
    /* get all comments with pagination, sorting and filtering */

    const data = await commentModel
      .find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "userID", model: "User" });

    if (!data.length) {
      throw new AppError("Коментарів за таким запитом не знайдено!", 404);
    }

    return data.map((item) => {
      const transformedItem = new CommentDTO(item);

      transformedItem.user = addLinks(transformedItem.user, "avatar");
      return transformedItem;
    });
  }

  async getOne({ id, articleID }) {
    /* get one comment by id and (optional) articleID */

    const doc = await commentModel
      .find({ _id: id, articleID: articleID || { $exists: true } })
      .populate({ path: "userID", model: "User" })
      .exec();

    if (doc.length === 0)
      throw new AppError("Коментаря за таким запитом не знайдено!", 404);

    const transformedItem = new CommentDTO(doc);
    transformedItem.user = addLinks(transformedItem.user, "avatar");

    return transformedItem;
  }

  async addOne(data) {
    /* add new comment */

    const articleService = new ArticleService();
    await articleService.getOne(data.articleID);

    data.isModerated = false;
    const doc = await commentModel.create(data);

    const transformedItem = new CommentDTO(doc);
    transformedItem.user = addLinks(transformedItem.user, "avatar");

    return transformedItem;
  }

  async updateOne(id, data) {
    // update comment by id

    const doc = await commentModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new AppError("Такого коментаря не знайдено!", 404);

    const transformedItem = new CommentDTO(doc);
    transformedItem.user = addLinks(transformedItem.user, "avatar");

    return transformedItem;
  }

  async deleteOne(id) {
    // delete comment by id

    const doc = await commentModel.findByIdAndDelete(id);

    if (!doc) throw new AppError("Такого коментаря не існує!", 404);
  }
}
