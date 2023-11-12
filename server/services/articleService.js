import articleModel from "../models/articleModel.js";
import { ArticleDTO } from "../dto/articleDTO.js";
import AppError from "../utils/appError.js";

export class articleService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await articleModel
      .find(filterObj)
      .sort(sortObj)
      .skip(--page * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }

    return data.map((item) => new ArticleDTO(item));
  }

  static async getOne({ id, populateObj, ip, userAgent }) {
    const doc = await articleModel.findById(id).populate(populateObj).exec();

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    const isOldView = doc.viewsArr.some(
      (elem) => elem.ip === ip && elem.userAgent === userAgent
    );

    if (!isOldView) {
      {
        doc.viewsArr.push({ ip, userAgent });
        doc.views += 1;
        await doc.save();
      }
    }

    return [new ArticleDTO(doc)];
  }

  static async addOne(data) {
    const doc = await articleModel.create(data);
    return [new ArticleDTO(doc)];
  }

  static async updateOne(id, data) {
    const doc = await articleModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new ArticleDTO(doc)];
  }

  static async deleteOne(id) {
    const doc = await articleModel.findByIdAndDelete(id);

    if (!doc) throw new AppError("There aren't documents with this id!", 404);
  }
}
