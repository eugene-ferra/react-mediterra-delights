import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.ObjectId,
    // required: [true, "Review must belong to product"],
    // ref: "Product",
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Review must belong to user!"],
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  review: {
    type: String,
    trim: true,
    maxLenght: [300, "Review must not contain more than 300 characters!"],
  },
  rating: {
    type: Number,
    enum: {
      values: [1, 2, 3, 4, 5],
      message:
        "{VALUE} is not supported. Please provide rating equal to 1,2,3,4 or 5.",
    },
    required: [true, "Review must contain a rating!"],
  },
});

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
