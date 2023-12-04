import mongoose from "mongoose";
import commentModel from "./commentModel.js";
import userModel from "./userModel.js";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Article must have a title!"],
      unique: [true, "Article with this title has already axists!"],
      trim: true,
      minLength: [1, "Article must have at least 1 characters!"],
      maxLenght: [100, "Article must not have more than 200 characters!"],
    },
    slug: {
      type: String,
    },
    topic: {
      type: String,
      required: true,
      enum: {
        values: ["Рецепти", "Поради", "Новини", "Інше"],
        message: "{VALUE} is not supported!",
      },
    },
    imgCover: {
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
      maxLenght: [200, "Article must not have more than 500 characters!"],
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

articleSchema.pre("findOneAndDelete", async function (next) {
  this.r = await this.clone().findOne();
  next();
});

articleSchema.post("findOneAndDelete", async function () {
  if (this.r) {
    await commentModel.deleteMany({ articleID: this.r._id });
    await userModel.updateMany(
      { likedArticles: { $in: [this.r._id] } },
      { $pull: { likedArticles: this.r._id } }
    );
    await userModel.updateMany(
      { savedArticles: { $in: [this.r._id] } },
      { $pull: { savedArticles: this.r._id } }
    );
  }
});

const articleModel = mongoose.model("Article", articleSchema);

export const Article = articleSchema;
export default articleModel;
