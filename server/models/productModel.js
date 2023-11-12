import mongoose, { Schema } from "mongoose";
import reviewModel from "./reviewModel.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product must have a title!"],
      unique: [true, "Product with this title has already axists!"],
      trim: true,
      minLength: [3, "Product must have at least 3 characters!"],
      maxLenght: [60, "Product must not have more than 60 characters!"],
    },
    category: {
      type: String,
      required: [true, "Product must have a category!"],
      enum: {
        values: [
          "Закуски",
          "Супи",
          "Випічка",
          "М'ясні страви",
          "Рибні страви",
          "Гарніри",
          "Салати",
          "Напої",
          "Десерти",
        ],
        message: "{VALUE} is not supported!",
      },
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product must have a description!"],
      trim: true,
      maxLenght: [350, "Product description must not have more then 350 characters!"],
    },
    fullText: {
      type: String,
      trim: true,
      maxLenght: [1500, "Product full text must not have more then 1500 characters!"],
    },
    avgRating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be below or equal to 0!"],
      max: [5, "Rating must not be more than 5!"],
    },
    reviewCount: {
      type: Number,
      min: [0, "Review count must be 0 or more!"],
      default: 0,
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
    images: [
      {
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
    ],
    weight: {
      type: Number,
      required: [true, "Product must have a weight!"],
      min: [0, "Product's weight is incorrect!"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price!"],
      min: [0, "Product's price is incorrect!"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Product's discount must be more than 0!"],
      validate: {
        validator: function (v) {
          return v < this.price;
        },
        message: (props) => `${props.value} must be less than price!`,
      },
    },
    nutrients: {
      calories: {
        type: Number,
        min: [0, "Calories must be more than 0!"],
      },
      carbohydrates: {
        type: Number,
        min: [0, "Carbohydrates must be more than 0!"],
      },
      protein: {
        type: Number,
        min: [0, "Protein must be more than 0!"],
      },
      fats: {
        type: Number,
        min: [0, "Fats must be more than 0!"],
      },
    },
    isVegan: {
      type: Boolean,
      required: [true, "Product must have a isVegan prorerty!"],
    },
    cookTime: {
      type: Number,
      min: [0, "Cook time must be more than 0!"],
      required: [true, "Product must have a cooking time!"],
    },
    isNewProduct: {
      type: Boolean,
    },
    compound: [String],
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

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productID",
});

productSchema.pre("findOneAndDelete", async function (next) {
  this.r = await this.clone().findOne();
  next();
});

productSchema.post("findOneAndDelete", async function () {
  if (this.r) await reviewModel.deleteMany({ productID: this.r._id });
  await userModel.updateMany(
    { savedProducts: { $in: [this.r._id] } },
    { $pull: { savedProducts: this.r._id } }
  );
  await userModel.updateMany(
    { cart: { $in: [this.r._id] } },
    { $pull: { cart: this.r._id } }
  );
});

const productModel = mongoose.model("Product", productSchema);

export const Product = productSchema;
export default productModel;
