import sharp from "sharp";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import AppError from "../utils/appError.js";

export default class fileService {
  constructor() {
    this._imageFormats = ["avif", "webp", "jpg"];
    this._staticFolder = "public";
  }

  async saveOneFormatImage(buffer, folder = "", payload = "") {
    const baseName = `${Date.now()}-${slugify(payload, { lower: true })}`;
    try {
      const sharpInstance = sharp(buffer);

      const localPath = path.join(folder, `${baseName}.jpg`);

      await sharpInstance
        .resize(null, null, { fit: "contain" })
        .toFormat("jpg")
        .toFile(path.join(this._staticFolder, localPath));

      return localPath;
    } catch (err) {
      return {};
    }
  }

  async saveOneImage(buffer, folder = "", payload = "", width = 500) {
    const baseName = `${Date.now()}-${slugify(payload, { lower: true })}`;
    const fullNameObj = {};

    try {
      const sharpInstance = sharp(buffer);

      await Promise.all(
        this._imageFormats.map(async (ext) => {
          const localPath = path.join(folder, `${baseName}.${ext}`);

          await sharpInstance
            .resize(width, null, { fit: "contain" })
            .toFormat(ext)
            .toFile(path.join(this._staticFolder, localPath));

          fullNameObj[ext] = localPath;
        })
      );

      return fullNameObj;
    } catch (err) {
      return {};
    }
  }

  async saveManyImages(buffArr, folder, payload, width) {
    try {
      const promises = buffArr.map(
        async (buffer, i) =>
          await this.saveOneImage(buffer, folder, `${payload}-${i}`, width)
      );

      return await Promise.all(promises);
    } catch (err) {
      return [];
    }
  }

  async deleteFiles(input) {
    const staticFolder = this._staticFolder;

    async function deleteFile(filePath) {
      try {
        await fs.promises.unlink(path.join(staticFolder, filePath));
      } catch (err) {
        //catch error
      }
    }

    async function processInput(inputValue) {
      if (typeof inputValue === "string") {
        await deleteFile(inputValue);
      } else if (Array.isArray(inputValue)) {
        await Promise.all(inputValue.map(processInput));
      } else if (typeof inputValue === "object" && inputValue !== null) {
        await Promise.all(Object.values(inputValue).map(processInput));
      }
    }

    await processInput(input);
  }

  base64toBuffer(string) {
    const base64string =
      string.split("data:image/jpeg;base64,")[1] ||
      string.split("data:image/png;base64,")[1];

    if (!base64string) {
      throw new AppError("Unsupported file!", 400);
    }

    return Buffer.from(base64string, "base64");
  }
}
