import AppError from "../utils/appError.js";
import workerModel from "../models/workerModel.js";
import { WorkerDTO } from "../dto/workerDTO.js";
import { fileService } from "./fileService.js";
import slugify from "slugify";

const folder = "workers";

export class workerService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await workerModel
      .find(filterObj)
      .sort(sortObj)
      .skip(--page * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }
    const docs = await workerModel.countDocuments(filterObj);

    return [{ pages: Math.ceil(docs / limit) }, data.map((item) => new WorkerDTO(item))];
  }

  static async getOne({ id, populateObj }) {
    const doc = await workerModel.findById(id).populate(populateObj).exec();

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new workerModel(doc)];
  }

  static async addOne(textData, photo) {
    const payload = slugify(`${textData.name}-${textData.lastName}`);

    const savedPhoto = await fileService.saveOneImage(photo, folder, payload, 500);

    textData["photo"] = savedPhoto;

    try {
      const doc = await workerModel.create(textData);
      return [new WorkerDTO(doc)];
    } catch (err) {
      await fileService.deleteFiles(savedPhoto);
      throw err;
    }
  }

  static async updateOne(id, data, photo) {
    let doc = await workerModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    const oldPhoto = JSON.parse(JSON.stringify(doc.photo));

    const payload = slugify(`${doc.name}-${doc.lastName}`);

    const savedPhoto = photo
      ? await fileService.saveOneImage(photo, folder, payload, 500)
      : null;

    if (!savedPhoto) {
      data["photo"] = oldPhoto;
    } else {
      data["photo"] = savedPhoto;
      await fileService.deleteFiles(oldPhoto);
    }

    try {
      const updatedDoc = await workerModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      return [new WorkerDTO(updatedDoc)];
    } catch (err) {
      await fileService.deleteFiles(savedPhoto);
      throw err;
    }
  }

  static async deleteOne(id) {
    const doc = await workerModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    const photo = JSON.parse(JSON.stringify(doc.photo));
    await fileService.deleteFiles(photo);

    await workerModel.findByIdAndDelete(id);
  }
}
