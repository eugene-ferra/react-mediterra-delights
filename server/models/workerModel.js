import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLenght: [3, "Worker's name must contain at least 3 characters!"],
      maxLenght: [20, "Worker's name must not contain more than 40 characters!"],
      trim: true,
      required: [true, "Worker must have a name!"],
    },
    lastName: {
      type: String,
      minLenght: [3, "Worker's lastname must contain at least 3 characters!"],
      maxLenght: [40, "Worker's lastname must not contain more than 40 characters!"],
      trim: true,
      required: [true, "Worker must have a lastname!"],
    },
    positionType: {
      type: String,
      enum: [
        "Адміністрація",
        "Кухонний персонал",
        "Обслуговуючий персонал",
        "Технічний персонал",
        "Інші працівники",
      ],
      required: [true, "Worker must have a positionType!"],
    },
    position: {
      type: String,
      minLenght: [3, "Worker's position must contain at least 3 characters!"],
      maxLenght: [80, "Worker's position must not contain more than 80 characters!"],
      trim: true,
      required: [true, "Worker must have a position!"],
    },
    summary: {
      type: String,
      required: [true, "Worker must have a summary!"],
      trim: true,
      maxLenght: [1000, "Worker summary must not have more then 1000 characters!"],
    },
    additionalInfo: {
      type: String,
      trim: true,
      maxLenght: [700, "Worker additionalInfo must not have more then 700 characters!"],
    },
    photo: {
      jpg: {
        type: String,
        required: true,
      },
      webp: {
        type: String,
        required: true,
      },
      avif: {
        type: String,
        required: true,
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Worker must have a dateOfBirth!"],
    },
    startWorkDate: {
      type: Date,
      required: [true, "Worker must have a startWorkDate!"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const workerModel = mongoose.model("Worker", workerSchema);

export const Worker = workerSchema;
export default workerModel;
