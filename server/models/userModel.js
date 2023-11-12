import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLenght: [3, "User's name must contain at least 3 characters!"],
      minLenght: [20, "User's name must not contain more than 40 characters!"],
      trim: true,
      required: [true, "User must have a name!"],
    },
    lastName: {
      type: String,
      minLenght: [3, "User's lastname must contain at least 3 characters!"],
      minLenght: [20, "User's lastname must not contain more than 40 characters!"],
      trim: true,
      required: [true, "User must have a name!"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "User must have an e-mail!"],
      unique: [true, "This user already exist!"],
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: [true, "User must have a password!"],
      minLenght: [8, "Password must have at least 8 characters!"],
    },
    avatar: {
      jpg: {
        type: String,
      },
      webp: {
        type: String,
      },
      avif: {
        type: String,
      },
    },
    savedProducts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    likedArticles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Article",
      },
    ],
    savedArticles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Article",
      },
    ],
    addedReviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
    addedComments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
    cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
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

export const User = userSchema;

const userModel = mongoose.model("User", userSchema);

export default userModel;
