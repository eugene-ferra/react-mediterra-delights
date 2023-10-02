import mongoose from "mongoose";

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
    disLikes: {
      type: Number,
      min: 0,
      default: 0,
    },
    views: {
      type: Number,
      min: 0,
      default: 0,
    },
    markup: {
      type: String,
      required: [true, "Article must have a markup!"],
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

const articleModel = mongoose.model("Article", articleSchema);

export default articleModel;
