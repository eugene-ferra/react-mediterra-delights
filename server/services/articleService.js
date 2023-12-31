import articleModel from "../models/articleModel.js";
import { ArticleDTO } from "../dto/articleDTO.js";
import AppError from "../utils/appError.js";
import { fileService } from "./fileService.js";
import * as cheerio from "cheerio";
import slugify from "slugify";

const folder = "articles";
export class articleService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    let data = await articleModel
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

  static async addOne(data, imgCover) {
    data["slug"] = slugify(data.title, { lower: true });

    const testDoc = await articleModel.findOne({ slug: data.slug });
    if (testDoc) throw new AppError("This article already exist!", 409);

    const payload = data.slug;

    const savedCover = await fileService.saveOneImage(imgCover, folder, payload, 500);

    data["imgCover"] = savedCover;
    let savedImages = [];
    const promises = [];

    const $ = cheerio.load(data.markup);

    $("img").each((i, element) => {
      const buffer = fileService.base64toBuffer(element.attribs.src);

      const savedImagePromise = new Promise(async (resolve, reject) => {
        const img = await fileService.saveOneImage(buffer, folder, `${payload}-${i}`);
        savedImages.push(img);

        if (Object.keys(img).length !== 0) {
          const currentTag = $(element);
          const srsSetStr = fileService._imageFormats.map((ext) => img[ext]).join(", ");

          currentTag.attr("src", img[fileService._imageFormats.slice(-1)[0]]);
          currentTag.attr("srcset", srsSetStr);
          currentTag.attr("alt", currentTag.attr("alt") || payload);
          resolve();
        } else {
          reject(new AppError("Error processing image", 400));
        }
      });

      promises.push(savedImagePromise);
    });

    await Promise.all(promises);
    data["markup"] = $.html($("article"));

    try {
      const doc = await articleModel.create(data);
      return [new ArticleDTO(doc)];
    } catch (err) {
      await fileService.deleteFiles(savedImages);
      await fileService.deleteFiles(savedCover);
      throw err;
    }
  }

  static async updateOne(id, data, imgCover) {
    const doc = await articleModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    if (data["title"]) {
      const newSlug = slugify(data.title, { lower: true });
      if (await articleModel.findOne({ slug: newSlug }))
        throw new AppError("this article already exist!", 409);

      data["slug"] = newSlug;
    }

    const oldCover = doc.imgCover;
    let oldImages = [];

    cheerio
      .load(doc.markup)("img")
      .each((i, elem) => {
        oldImages.push(...elem.attribs.srcset.split(", "));
      }) || [];

    const payload = data?.slug || doc.slug;

    const savedCover = await fileService.saveOneImage(imgCover, folder, payload, 500);

    if (Object.keys(savedCover).length === 0) {
      data["imgCover"] = doc.imgCover;
    } else {
      data["imgCover"] = savedCover;
      await fileService.deleteFiles(oldCover);
    }

    let savedImages = [];
    if (data?.markup) {
      const $ = cheerio.load(data.markup);
      const promises = [];

      $("img").each((i, element) => {
        const buffer = fileService.base64toBuffer(element.attribs.src);

        const savedImagePromise = new Promise(async (resolve, reject) => {
          const img = await fileService.saveOneImage(buffer, folder, `${payload}-${i}`);
          savedImages.push(img);

          if (Object.keys(img).length !== 0) {
            const currentTag = $(element);
            const srsSetStr = fileService._imageFormats
              .map((ext) => img[ext])
              .join(", ");

            currentTag.attr("src", img[fileService._imageFormats.slice(-1)[0]]);
            currentTag.attr("srcset", srsSetStr);
            currentTag.attr("alt", currentTag.attr("alt") || payload);
            resolve();
          } else {
            reject(new AppError("Error processing image", 400));
          }
        });

        promises.push(savedImagePromise);
      });

      await Promise.all(promises);
      await fileService.deleteFiles(oldImages);

      data["markup"] = $.html($("article"));
    }

    try {
      const doc = await articleModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      return [new ArticleDTO(doc)];
    } catch (err) {
      await fileService.deleteFiles(savedCover);
      await fileService.deleteFiles(savedImages);
      throw err;
    }
  }

  static async deleteOne(id) {
    const doc = await articleModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    const $ = cheerio.load(doc.markup);

    let links = [];
    $("img").each((i, element) => {
      links.push(...element.attribs.srcset.split(", "));
    });

    await fileService.deleteFiles(links);
    await fileService.deleteFiles(doc.imgCover);
    await articleModel.findByIdAndDelete(id);
  }

  static getOptions() {
    const options = {
      topic: articleModel.schema.path("topic").enumValues,
    };

    return options;
  }
}
