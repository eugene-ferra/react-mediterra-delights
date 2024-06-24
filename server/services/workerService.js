import slugify from "slugify";
import AppError from "../utils/appError.js";
import WorkerModel from "../models/workerModel.js";
import WorkerDTO from "../dto/workerDTO.js";
import FileService from "./fileService.js";

const folder = "workers";

export default class workerService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await WorkerModel.find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }
    const docs = await WorkerModel.countDocuments(filterObj);

    return [{ pages: Math.ceil(docs / limit) }, data.map((item) => new WorkerDTO(item))];
  }

  static async getOne({ id, populateObj }) {
    const doc = await WorkerModel.findById(id).populate(populateObj).exec();

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new WorkerModel(doc)];
  }

  static async addOne(textData, photo) {
    const FS = new FileService();
    const payload = slugify(`${textData.name}-${textData.lastName}`);

    const savedPhoto = await FS.saveOneImage(photo, folder, payload, 500);

    textData.photo = savedPhoto;

    try {
      const doc = await WorkerModel.create(textData);
      return [new WorkerDTO(doc)];
    } catch (err) {
      await FS.deleteFiles(savedPhoto);
      throw err;
    }
  }

  static async updateOne(id, data, photo) {
    const FS = new FileService();
    const doc = await WorkerModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    const oldPhoto = JSON.parse(JSON.stringify(doc.photo));

    const payload = slugify(`${doc.name}-${doc.lastName}`);

    const savedPhoto = photo ? await FS.saveOneImage(photo, folder, payload, 500) : null;

    if (!savedPhoto) {
      data.photo = oldPhoto;
    } else {
      data.photo = savedPhoto;
      await FS.deleteFiles(oldPhoto);
    }

    try {
      const updatedDoc = await WorkerModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      return [new WorkerDTO(updatedDoc)];
    } catch (err) {
      await FS.deleteFiles(savedPhoto);
      throw err;
    }
  }

  static async deleteOne(id) {
    const FS = new FileService();
    const doc = await WorkerModel.findById(id);
    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    const photo = JSON.parse(JSON.stringify(doc.photo));
    await FS.deleteFiles(photo);

    await WorkerModel.findByIdAndDelete(id);
  }

  static getOptions() {
    const options = {
      positionTypes: WorkerModel.schema.path("positionType").enumValues,
    };

    return options;
  }
}
