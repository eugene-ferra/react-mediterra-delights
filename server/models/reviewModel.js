import mongoose from "mongoose";
import productModel from "./productModel.js";
import userModel from "./userModel.js";

const reviewSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Review must belong to a product!"],
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

reviewSchema.virtual("product", {
  ref: "Product",
  localField: "productID",
  foreignField: "_id",
});

reviewSchema.index({ userID: 1, productID: 1 }, { unique: true });

reviewSchema.statics.calcAvgRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { productID: productId, isModerated: true },
    },
    {
      $group: {
        _id: "$productID",
        ratingCount: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats[0]) {
    await productModel.findByIdAndUpdate(productId, {
      avgRating: stats[0].avgRating,
      reviewCount: stats[0].ratingCount,
    });
  } else {
    await productModel.findByIdAndUpdate(productId, {
      avgRating: 0,
      reviewCount: 0,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAvgRating(this.productID);
});

reviewSchema.post("save", async function (doc) {
  await userModel.findByIdAndUpdate(doc.userID, {
    $push: {
      addedReviews: doc._id,
    },
  });
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reviewSchema.pre("findOneAndDelete", async function (next) {
  this.r = await this.clone().findOne();
  await userModel.updateOne(
    { _id: this.r.userID },
    { $pull: { addedReviews: this.r._id } }
  );
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.r) await this.r.constructor.calcAvgRating(this.r.productID);
});

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
