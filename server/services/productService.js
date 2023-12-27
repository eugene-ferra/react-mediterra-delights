import AppError from "../utils/appError.js";
import productModel from "../models/productModel.js";
import { ProductDTO } from "../dto/productDTO.js";
import { fileService } from "./fileService.js";
import slugify from "slugify";

const folder = "products";
export class productService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await productModel
      .find(filterObj)
      .sort(sortObj)
      .skip(--page * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }
    const docs = await productModel.countDocuments(filterObj);

    return [
      { pages: Math.ceil(docs / limit) },
      data.map((item) => new ProductDTO(item)),
    ];
  }

  static async getOne({ id, populateObj }) {
    const doc = await productModel.findById(id).populate(populateObj).exec();

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new ProductDTO(doc)];
  }

  static async addOne(textData, imgCover, images = []) {
    textData["slug"] = slugify(textData.title, { lower: true, strict: true });

    const testDoc = await productModel.findOne({ slug: textData.slug });

    if (testDoc) throw new AppError("This product already exist!", 409);

    const payload = textData.slug;

    const savedCover = await fileService.saveOneImage(imgCover, folder, payload, 500);
    const savedImages = await fileService.saveManyImages(images, folder, payload, 700);

    textData["imgCover"] = savedCover;
    textData["images"] = savedImages;

    try {
      const doc = await productModel.create(textData);
      return [new ProductDTO(doc)];
    } catch (err) {
      await fileService.deleteFiles(savedCover);
      await fileService.deleteFiles(savedImages);

      throw err;
    }
  }

  static async updateOne(id, data, imgCover, images = []) {
    let doc = await productModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    if (data["title"]) {
      const newSlug = slugify(data.title, { lower: true });
      if (await productModel.findOne({ slug: newSlug }))
        throw new AppError("this product already exist!", 409);

      data["slug"] = newSlug;
    }

    const oldCover = JSON.parse(JSON.stringify(doc.imgCover));
    const oldImages = JSON.parse(JSON.stringify(doc.images));

    const payload = data?.slug || doc.slug;

    const savedCover = await fileService.saveOneImage(imgCover, folder, payload, 500);
    const savedImages = await fileService.saveManyImages(images, folder, payload, 700);

    if (Object.keys(savedCover).length === 0) {
      data["imgCover"] = doc.imgCover;
    } else {
      data["imgCover"] = savedCover;
      await fileService.deleteFiles(oldCover);
    }

    data["images"] = savedImages;
    await fileService.deleteFiles(oldImages);

    data["price"] = data?.price || doc.price;

    try {
      const updatedDoc = await productModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      return [new ProductDTO(updatedDoc)];
    } catch (err) {
      await fileService.deleteFiles(savedCover);
      await fileService.deleteFiles(savedImages);

      throw err;
    }
  }

  static async deleteOne(id) {
    const doc = await productModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    const imgCover = JSON.parse(JSON.stringify(doc.imgCover));
    const images = JSON.parse(JSON.stringify(doc.images));

    await fileService.deleteFiles(imgCover);
    await fileService.deleteFiles(images);

    await productModel.findByIdAndDelete(id);
  }

  static getOptions() {
    const options = {
      categories: productModel.schema.path("category").enumValues,
    };

    return options;
  }
}
