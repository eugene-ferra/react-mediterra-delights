import mongoose from "mongoose";

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

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
