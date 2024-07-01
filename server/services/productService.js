import slugify from "slugify";
import mongoose from "mongoose";
import AppError from "../utils/appError.js";
import productModel from "../models/productModel.js";
import ProductDTO from "../dto/productDTO.js";
import FileService from "./fileService.js";
import addLinks from "../utils/addLinks.js";

export default class productService {
  constructor() {
    this._folder = "products";
  }

  createSlug(title) {
    /* create slug from title */

    return slugify(title, { lower: true, strict: true });
  }

  async countDocuments(filterObj, limit = 15) {
    /* count all pages based on filters and items per page (limit) */

    const docs = await productModel.countDocuments(filterObj);
    return Math.ceil(docs / limit);
  }

  async getAll({ filterObj, sortObj, page = 1, limit = 15 }, completeUrl = true) {
    /* get all products with pagination, sorting and filtering */
    const data = await productModel
      .find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!data.length) {
      throw new AppError("Страв по такому запиту не знайдено!", 404);
    }

    return data.map((item) => {
      const productDTO = new ProductDTO(item);
      if (completeUrl) return addLinks(productDTO, ["imgCover", "images"]);

      return productDTO;
    });
  }

  async getOne(id, completeUrl = true) {
    /* get one product by id or slug */
    let doc;
    if (mongoose.isValidObjectId(id)) {
      doc = await productModel.findById(id).exec();
    } else {
      doc = await productModel.findOne({ slug: id }).exec();
    }

    if (!doc) throw new AppError("Такої страви не знайдено!", 404);

    if (completeUrl) return addLinks(new ProductDTO(doc), ["imgCover", "images"]);
    return new ProductDTO(doc);
  }

  async testSlug(title) {
    /*created slug from title, test it for uniqueness and return */

    const slug = this.createSlug(title);

    // Check if the document with this slug already exists
    const testDoc = await productModel.findOne({ slug: slug });
    if (testDoc) throw new AppError("Страва з такою назвою вже існує!", 409);

    return slug;
  }

  async addOne(textData, imgCover, images, completeUrl = true) {
    /* add one product to database */
    const fileService = new FileService();

    const slug = await this.testSlug(textData.title);
    const savedCover = await fileService.saveOneImage(imgCover, this._folder, slug, 500);
    const savedImg = await fileService.saveManyImages(images, this._folder, slug, 700);

    textData.slug = slug;
    textData.imgCover = savedCover;
    textData.images = savedImg;

    try {
      const doc = await productModel.create(textData);

      if (completeUrl) return addLinks(new ProductDTO(doc), ["imgCover", "images"]);
      return new ProductDTO(doc);
    } catch (err) {
      await fileService.deleteFiles(savedCover);
      await fileService.deleteFiles(savedImg);

      throw new AppError("Сталася не передбачувана помилка, спробуйте пізніше!", 400);
    }
  }

  async updateOne({ id, data, newImgCover, newImages }, completeUrl = true) {
    const fileService = new FileService();
    let savedCover;

    const prevDoc = await this.getOne(id, false);
    let { slug } = prevDoc;
    const { imgCover: oldCover, images: oldImages } = prevDoc;

    if (this.createSlug(data.title) !== slug) slug = await this.testSlug(data.title);

    if (newImgCover)
      savedCover = await fileService.saveOneImage(newImgCover, this._folder, slug);

    const savedImages = await fileService.saveManyImages(newImages, this._folder, slug);

    // add slug and images to product data
    data.slug = slug;
    data.imgCover = savedCover || oldCover;
    data.images = savedImages;
    data.price = data.price || prevDoc.price;

    try {
      const updatedDoc = await productModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      if (savedCover && newImgCover) await fileService.deleteFiles(oldCover);
      await fileService.deleteFiles(oldImages);

      if (completeUrl)
        return addLinks(new ProductDTO(updatedDoc), ["imgCover", "images"]);

      return new ProductDTO(updatedDoc);
    } catch (err) {
      if (savedCover) {
        await fileService.deleteFiles(savedCover);
      }
      await fileService.deleteFiles(savedImages);

      throw new AppError("Сталася не передбачувана помилка, спробуйте пізніше!", 400);
    }
  }

  async deleteOne(id) {
    /* delete one product by id with images */

    const FS = new FileService();

    const doc = await this.getOne(id, false);
    const { imgCover, images } = doc;

    await FS.deleteFiles(imgCover);
    await FS.deleteFiles(images);

    await productModel.findByIdAndDelete(id);
  }

  getOptions() {
    /* get all categories for the product */

    const options = {
      categories: productModel.schema.path("category").enumValues,
    };

    return options;
  }
}
