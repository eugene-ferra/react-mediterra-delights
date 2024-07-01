import slugify from "slugify";
import AppError from "../utils/appError.js";
import WorkerModel from "../models/workerModel.js";
import WorkerDTO from "../dto/workerDTO.js";
import FileService from "./fileService.js";
import addLinks from "../utils/addLinks.js";

export default class workerService {
  constructor() {
    this._folder = "workers";
  }

  async countPages(filterObj, limit = 15) {
    /* count all pages based on filters and items per page (limit) */

    const docs = await WorkerModel.countDocuments(filterObj);

    return Math.ceil(docs / limit);
  }

  async getAll({ filterObj, sortObj, page = 1, limit = 15 }) {
    /* get all workers with pagination, sorting and filtering */

    const data = await WorkerModel.find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!data.length) {
      throw new AppError("Правівників за таким запитом не знайдено!", 404);
    }

    return data.map((item) => {
      const workerDTO = new WorkerDTO(item);
      return addLinks(workerDTO, ["photo"]);
    });
  }

  async getOne(id) {
    /* get one worker by id or slug */

    const doc = await WorkerModel.findById(id).exec();

    if (!doc) throw new AppError("Такого працівника не знайдено!", 404);

    return addLinks(new WorkerDTO(doc), ["photo"]);
  }

  async addOne(textData, photo) {
    /* add one worker with photo*/

    const FS = new FileService();
    const payload = slugify(`${textData.name}-${textData.lastName}`);

    const savedPhoto = await FS.saveOneImage(photo, this._folder, payload, 500);

    textData.photo = savedPhoto;

    try {
      const doc = await WorkerModel.create(textData);
      return addLinks(new WorkerDTO(doc), ["photo"]);
    } catch (err) {
      await FS.deleteFiles(savedPhoto);
      throw err;
    }
  }

  async updateOne(id, data, photo) {
    /* update one worker by id with photo */

    const doc = await this.getOne(id);
    const FS = new FileService();

    const oldPhoto = JSON.parse(JSON.stringify(doc.photo));
    const payload = slugify(`${doc.name}-${doc.lastName}`);

    const savedPhoto = photo
      ? await FS.saveOneImage(photo, this._folder, payload, 500)
      : null;

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

      return addLinks(new WorkerDTO(updatedDoc), ["photo"]);
    } catch (err) {
      await FS.deleteFiles(savedPhoto);
      throw new AppError("Сталася не передбачувана помилка, спробуйте пізніше!", 400);
    }
  }

  async deleteOne(id) {
    /* delete one worker by id with photo */

    const FS = new FileService();
    const doc = await this.getOne(id);

    const photo = JSON.parse(JSON.stringify(doc.photo));

    await WorkerModel.findByIdAndDelete(id);
    await FS.deleteFiles(photo);
  }

  getOptions() {
    /* get all possible options for worker position type */

    const options = {
      positionTypes: WorkerModel.schema.path("positionType").enumValues,
    };

    return options;
  }
}
