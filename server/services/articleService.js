import * as cheerio from "cheerio";
import slugify from "slugify";
import path from "path";
import mongoose from "mongoose";
import articleModel from "../models/articleModel.js";
import ArticleDTO from "../dto/articleDTO.js";
import AppError from "../utils/appError.js";
import FileService from "./fileService.js";
import addLinks from "../utils/addLinks.js";

export default class articleService {
  constructor() {
    this._folder = "articles";
  }

  _addLinksToMarkup(doc) {
    /* add links to images in the markup field */

    const port = process.env.PORT || 3000;
    const protocol = process.env.PROTOCOL || "http";
    const hostname = process.env.HOSTNAME || "localhost";
    const linkBegin = `${protocol}://${hostname}:${port}/`;

    const $ = cheerio.load(doc.markup);
    $("img").each((index, element) => {
      if (element.attribs.src.includes("articles")) {
        element.attribs.src = `${element.attribs.src.replace(/\\/g, "/")}`;
        const oldBegin = element.attribs.src.split("articles")[0];
        element.attribs.src = element.attribs.src.replace(oldBegin, linkBegin);
      }
    });

    doc.markup = $.html();

    return doc;
  }

  async countPages(filterObj, limit = 15) {
    /* count all pages based on filters and items per page (limit) */

    const docs = await articleModel.countDocuments(filterObj);
    return Math.ceil(docs / limit);
  }

  async getAll({ filterObj, sortObj, page = 1, limit = 15 }) {
    /* get all articles with pagination, sorting and filtering */
    const data = await articleModel
      .find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!data.length) {
      throw new AppError("Статей за таким запитом не знайдено!", 404);
    }

    return data.map((item) =>
      addLinks(new ArticleDTO(this._addLinksToMarkup(item)), ["imgCover"])
    );
  }

  async getAndAddViews({ id, ip, userAgent }) {
    let article;
    if (mongoose.isValidObjectId(id)) {
      article = await articleModel.findById(id).exec();
    } else {
      article = await articleModel.findOne({ slug: id }).exec();
    }

    if (!article) throw new AppError("Такої статті не знайдено!", 404);

    // Check if the user has already viewed this article
    const isOldView = article.viewsArr.some(
      (elem) => elem.ip === ip && elem.userAgent === userAgent
    );

    // If the user is new, add a new view
    if (!isOldView) {
      article = await articleModel.findByIdAndUpdate(
        article.id,
        {
          $inc: { views: 1 },
          $push: { viewsArr: { ip, userAgent } },
        },
        { runValidators: true, new: true }
      );
    }

    return addLinks(new ArticleDTO(this._addLinksToMarkup(article)), ["imgCover"]);
  }

  async getOne(id) {
    /* get one article by id or slug */

    let doc;
    if (mongoose.isValidObjectId(id)) {
      doc = await articleModel.findById(id).exec();
    } else {
      doc = await articleModel.findOne({ slug: id }).exec();
    }

    if (!doc) throw new AppError("Такої статті не знайдено!", 404);

    return addLinks(new ArticleDTO(this._addLinksToMarkup(doc)), ["imgCover"]);
  }

  async addOne(data, imgCover) {
    /* add one article to the database with image */

    const FS = new FileService();
    let savedCover = [];
    const slug = slugify(data.title, { lower: true });

    // Check if the document with this slug already exists
    const testDoc = await articleModel.findOne({ slug: data.slug });
    if (testDoc) throw new AppError("Стаття з такою назвою вже існує!", 409);

    savedCover = await FS.saveOneImage(imgCover, this._folder, slug, 500);

    data.imgCover = savedCover;
    // Create a new article with the default markup
    data.markup = "<article></article>";
    data.slug = slug;

    try {
      const doc = await articleModel.create(data);
      return addLinks(new ArticleDTO(this._addLinksToMarkup(doc)), ["imgCover"]);
    } catch (err) {
      await FS.deleteFiles(savedCover);
      throw err;
    }
  }

  async updateOne(id, data, imgCover) {
    /* update one article by id with image */

    const FS = new FileService();
    let savedCover = null;
    let linksToDelete = [];

    const doc = await this.getOne(id);

    // Check if the title has changed and if the slug is unique
    if (data.title !== doc.title && data.title) {
      const newSlug = slugify(data.title, { lower: true });
      const existingArticle = await articleModel.findOne({ slug: newSlug });

      if (existingArticle) throw new AppError("Стаття з такою назвою вже існує!", 409);

      data.slug = newSlug;
    }

    const oldCover = doc.imgCover;
    const payload = data?.slug || doc.slug;

    savedCover = await FS.saveOneImage(imgCover, this._folder, payload, 500);

    // If the cover is not updated, save the old one
    if (!Object.keys(savedCover).length) {
      data.imgCover = doc.imgCover;
    } else {
      data.imgCover = savedCover;
      await FS.deleteFiles(oldCover);
    }

    // If the markup is updated, check for deleted images
    if (data.markup) {
      const old$ = cheerio.load(doc.markup);
      const new$ = cheerio.load(data.markup);

      const oldLinks = [];
      const newLinks = [];

      // Get all links from the old  markup
      old$("img").each((i, element) => {
        oldLinks.push(
          path.join(
            this._folder,
            element.attribs.src.split(`${this._folder}`)?.[1] || element.attribs.src
          )
        );
      });

      // Get all links from the new markup
      new$("img").each((i, element) => {
        newLinks.push(
          path.join(
            this._folder,
            element.attribs.src.split(`${this._folder}`)?.[1] || element.attribs.src
          )
        );
      });

      // Find links that are not in the new markup
      linksToDelete = oldLinks.filter((link) => !newLinks.includes(link));
    }

    try {
      const updatedDoc = await articleModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });
      await FS.deleteFiles(linksToDelete);
      return addLinks(new ArticleDTO(this._addLinksToMarkup(updatedDoc)), ["imgCover"]);
    } catch (err) {
      if (savedCover) await FS.deleteFiles(savedCover);

      throw new AppError("Сталася не передбачувана помилка, спробуйте пізніше!", 400);
    }
  }

  async deleteOne(id) {
    /* delete one article by id with images */

    const FS = new FileService();
    const doc = await this.getOne(id);
    const $ = cheerio.load(doc.markup);

    // Get all links from the markup
    const links = [];
    $("img").each((i, element) => {
      links.push(
        path.join(
          this._folder,
          element.attribs.src.split(`${this._folder}`)?.[1] || element.attribs.src
        )
      );
    });

    await articleModel.findByIdAndDelete(id);
    await FS.deleteFiles(links);
    await FS.deleteFiles(doc.imgCover);
  }

  static getOptions() {
    /* get all possible options for articles */

    const options = {
      topic: articleModel.schema.path("topic").enumValues,
    };

    return options;
  }
}
