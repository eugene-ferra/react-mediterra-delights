import mongoose from "mongoose";
import commentModel from "./commentModel.js";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Article must have a title!"],
      unique: [true, "Article with this title has already axists!"],
      trim: true,
      minLength: [3, "Article must have at least 3 characters!"],
      maxLenght: [200, "Article must not have more than 200 characters!"],
    },
    imgCover: {
      type: String,
      required: [true, "Article must have an image!"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      min: 0,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    viewsArr: {
      type: [
        {
          ip: {
            type: String,
          },
          userAgent: {
            type: String,
          },
        },
      ],
      select: false,
    },
    markup: {
      type: String,
      required: [true, "Article must have a markup!"],
    },
    previewText: {
      type: String,
      trim: true,
      required: [true, "Article must have preview text!"],
      minLength: [3, "Article must have at least 3 characters!"],
      maxLenght: [500, "Article must not have more than 500 characters!"],
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

articleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "articleID",
});

articleSchema.statics.addView = async function (id, ip, userAgent) {
  await this.findByIdAndUpdate(id, {
    $push: { viewsArr: { ip, userAgent } },
    $inc: { views: 1 },
  });
};

articleSchema.post("findOne", async function (doc) {});

articleSchema.pre("findOneAndDelete", async function (next) {
  this.r = await this.clone().findOne();
  next();
});

articleSchema.post("findOneAndDelete", async function () {
  if (this.r) await commentModel.deleteMany({ articleID: this.r._id });
});

const articleModel = mongoose.model("Article", articleSchema);

export default articleModel;
