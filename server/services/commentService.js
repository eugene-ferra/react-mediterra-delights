import AppError from "../utils/appError.js";
import commentModel from "../models/commentModel.js";
import { CommentDTO } from "../dto/commentDTO.js";
import articleModel from "../models/articleModel.js";
import userService from "./userService.js";

export class commentService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await commentModel
      .find(filterObj)
      .sort(sortObj)
      .skip(--page * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }

    return data.map((item) => new CommentDTO(item));
  }

  static async getOne({ id, articleID, populateObj }) {
    const doc = await commentModel
      .find({ _id: id, articleID: articleID || { $exists: true } })
      .populate(populateObj)
      .exec();

    if (doc.length === 0)
      throw new AppError("There aren't documents with this id!", 404);

    return [new CommentDTO(doc[0])];
  }

  static async addOne(data) {
    const isExist = await articleModel.findById(data.articleID);

    if (!isExist) throw new AppError("Article with provided id does not exists!", 400);

    const doc = await commentModel.create(data);
    return [new CommentDTO(doc)];
  }

  static async updateOne(id, data, role, userId) {
    if (role === "user") {
      const user = await userService.getOne({ id: userId });
      if (!user[0].addedComments.includes(id))
        throw new AppError("You can't change other comments!", 403);

      data["isModerated"] = false;
    } else {
      delete data["comment"];
    }

    const doc = await commentModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new CommentDTO(doc)];
  }

  static async deleteOne(id, role, userId) {
    if (role === "user") {
      const user = await userService.getOne({ id: userId });
      if (!user[0].addedComments.includes(id))
        throw new AppError("You can't delete other comments!", 403);
    }

    const doc = await commentModel.findByIdAndDelete(id);

    if (!doc) throw new AppError("There aren't documents with this id!", 404);
  }
}
