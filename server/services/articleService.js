import * as cheerio from "cheerio";
import slugify from "slugify";
import path from "path";
import mongoose from "mongoose";
import articleModel from "../models/articleModel.js";
import ArticleDTO from "../dto/articleDTO.js";
import AppError from "../utils/appError.js";
import FileService from "./fileService.js";

const folder = "articles";
export default class articleService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await articleModel
      .find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }

    const docs = await articleModel.countDocuments(filterObj);

    return [
      { pages: Math.ceil(docs / limit) },
      data.map((item) => new ArticleDTO(item)),
    ];
  }

  static async getOne({ id, populateObj, ip, userAgent }) {
    let doc;
    if (mongoose.isValidObjectId(id)) {
      doc = await articleModel.findById(id).populate(populateObj).exec();
    } else {
      doc = await articleModel.findOne({ slug: id }).populate(populateObj).exec();
    }

    if (!doc) throw new AppError("There aren't documents with this id or slug!", 404);

    const isOldView = doc.viewsArr.some(
      (elem) => elem.ip === ip && elem.userAgent === userAgent
    );

    if (!isOldView) {
      doc.viewsArr.push({ ip, userAgent });
      doc.views += 1;
      await doc.save();
    }

    return [new ArticleDTO(doc)];
  }

  static async addOne(data, imgCover) {
    const FS = new FileService();
    let savedCover = [];
    data.slug = slugify(data.title, { lower: true });

    const testDoc = await articleModel.findOne({ slug: data.slug });
    if (testDoc) throw new AppError("Стаття з такою назвою вже існує!", 409);

    const payload = data.slug;

    savedCover = await FS.saveOneImage(imgCover, folder, payload, 500);

    data.imgCover = savedCover;
    data.markup = "<article></article>";
    try {
      const doc = await articleModel.create(data);
      return [new ArticleDTO(doc)];
    } catch (err) {
      await FS.deleteFiles(savedCover);
      throw err;
    }
  }

  static async updateOne(id, data, imgCover) {
    const FS = new FileService();
    let savedCover;
    let linksToDelete = [];

    try {
      const doc = await articleModel.findById(id);
      if (!doc) {
        throw new AppError("There aren't documents with this id!", 404);
      }

      if (data.title !== doc.title && data.title) {
        const newSlug = slugify(data.title, { lower: true });
        const existingArticle = await articleModel.findOne({ slug: newSlug });

        if (existingArticle) {
          throw new AppError("Стаття з такою назвою вже існує!", 409);
        }

        data.slug = newSlug;
      }

      const oldCover = doc.imgCover;

      const payload = data?.slug || doc.slug;

      savedCover = await FS.saveOneImage(imgCover, folder, payload, 500);

      if (!Object.keys(savedCover).length) {
        data.imgCover = doc.imgCover;
      } else {
        data.imgCover = savedCover;
        await FS.deleteFiles(oldCover);
      }

      if (data.markup) {
        const old$ = cheerio.load(doc.markup);
        const new$ = cheerio.load(data.markup);

        const oldLinks = [];
        const newLinks = [];
        old$("img").each((i, element) => {
          oldLinks.push(
            path.join(
              folder,
              element.attribs.src.split(`${folder}`)?.[1] || element.attribs.src
            )
          );
        });

        new$("img").each((i, element) => {
          newLinks.push(
            path.join(
              folder,
              element.attribs.src.split(`${folder}`)?.[1] || element.attribs.src
            )
          );
        });

        linksToDelete = oldLinks.filter((link) => !newLinks.includes(link));
      }

      const updatedDoc = await articleModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      await FS.deleteFiles(linksToDelete);

      return [new ArticleDTO(updatedDoc)];
    } catch (err) {
      if (savedCover) {
        await FS.deleteFiles(savedCover);
      }

      throw err;
    }
  }

  static async deleteOne(id) {
    const FS = new FileService();
    const doc = await articleModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    const $ = cheerio.load(doc.markup);

    const links = [];
    $("img").each((i, element) => {
      links.push(
        path.join(
          folder,
          element.attribs.src.split(`${folder}`)?.[1] || element.attribs.src
        )
      );
    });

    await articleModel.findByIdAndDelete(id);
    await FS.deleteFiles(links);
    await FS.deleteFiles(doc.imgCover);
  }

  static getOptions() {
    const options = {
      topic: articleModel.schema.path("topic").enumValues,
    };

    return options;
  }
}
