import AppError from "../utils/appError.js";
import productModel from "../models/productModel.js";
import { ProductDTO } from "../dto/productDTO.js";
import { fileService } from "./fileService.js";

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

    return data.map((item) => new ProductDTO(item));
  }

  static async getOne({ id, populateObj }) {
    const doc = await productModel.findById(id).populate(populateObj).exec();

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new ProductDTO(doc)];
  }

  static async addOne(textData, imgCover, images = []) {
    const testDoc = await productModel.findOne({ title: textData.title });
    if (testDoc) throw new AppError("This product already exist!", 409);
    const payload = textData.title;

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

    const oldCover = JSON.parse(JSON.stringify(doc.imgCover));
    const oldImages = JSON.parse(JSON.stringify(doc.images));

    const payload = data?.title || doc.title;

    const savedCover = await fileService.saveOneImage(imgCover, folder, payload, 500);
    const savedImages = await fileService.saveManyImages(images, folder, payload, 700);

    data["imgCover"] = savedCover;
    data["images"] = savedImages;
    data["price"] = data?.price || doc.price;

    try {
      const updatedDoc = await productModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      await fileService.deleteFiles(oldCover);
      await fileService.deleteFiles(oldImages);

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
