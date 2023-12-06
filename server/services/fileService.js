import sharp from "sharp";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import AppError from "../utils/appError.js";

export class fileService {
  static _imageFormats = ["avif", "webp", "jpg"];
  static _staticFolder = "public";

  static async saveOneImage(buffer, folder = "", payload, width = null) {
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

  static async saveManyImages(buffArr, folder, payload, width) {
    try {
      const promises = buffArr.map(async (buffer, i) => {
        return await this.saveOneImage(buffer, folder, `${payload}-${i}`, width);
      });

      return await Promise.all(promises);
    } catch (err) {
      return [];
    }
  }

  static async deleteFiles(input) {
    const staticFolder = this._staticFolder;

    async function deleteFile(filePath) {
      try {
        await fs.promises.unlink(path.join(staticFolder, filePath));
      } catch (err) {}
    }

    async function processInput(input) {
      if (typeof input === "string") {
        await deleteFile(input);
      } else if (Array.isArray(input)) {
        await Promise.all(input.map(processInput));
      } else if (typeof input === "object" && input !== null) {
        await Promise.all(Object.values(input).map(processInput));
      }
    }

    await processInput(input);
  }

  static base64toBuffer(string) {
    let base64string;

    base64string =
      string.split("data:image/jpeg;base64,")[1] ||
      string.split("data:image/png;base64,")[1];

    if (!base64string) {
      throw new AppError("Unsupported file!", 400);
    }

    return Buffer.from(base64string, "base64");
  }
}
