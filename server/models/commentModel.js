import mongoose from "mongoose";
import userModel from "./userModel.js";
import AppError from "../utils/appError.js";

const commentSchema = new mongoose.Schema(
  {
    articleID: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Comment must belong to a product!"],
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Comment must belong to user!"],
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comment: {
      type: String,
      trim: true,
      maxLenght: [300, "Comment must not contain more than 300 characters!"],
      required: [true, "Comment must have a text!"],
    },
    isModerated: {
      type: Boolean,
      default: false,
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

commentSchema.virtual("article", {
  ref: "Article",
  localField: "articleID",
  foreignField: "_id",
});

commentSchema.post("save", async function (doc) {
  await userModel.findByIdAndUpdate(doc.userID, {
    $push: {
      addedComments: doc._id,
    },
  });
});

commentSchema.pre("findOneAndDelete", async function (next) {
  this.r = await this.clone().findOne();
  await userModel.updateOne(
    { _id: this.r.userID },
    { $pull: { addedComments: this.r._id } }
  );
  next();
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
