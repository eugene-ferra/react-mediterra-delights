import { body, param } from "express-validator";

export const productValidationSchema = {
  id: {
    isMongoId: {
      if: param("id").exists(),
      errorMessage: "incorrect product id!",
    },
  },
  title: {
    matches: {
      if: body("title").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage:
        "Title can contain only ukrainian and english letters, numbers and specials symbols!",
    },
    isString: {
      if: body("title").exists(),
      errorMessage: "title should be a string!",
    },
    isLength: {
      if: body("title").exists(),
      options: {
        min: 3,
        max: 60,
      },
      errorMessage: "Title must contain from 3 to 60 characters",
    },
    trim: true,
  },
  category: {
    isIn: {
      if: body("category").exists(),
      options: [
        [
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
      ],
      errorMessage: "This value is not allowed!",
    },
  },
  description: {
    matches: {
      if: body("description").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage:
        "Description can contain only ukrainian and english letters, numbers and specials symbols!",
    },
    isString: {
      if: body("description").exists(),
      errorMessage: "Description should be a string!",
    },
    isLength: {
      if: body("description").exists(),
      options: {
        min: 0,
        max: 350,
      },
      errorMessage: "Description should contain from 0 to 350 characters!",
    },
    trim: true,
  },
  fullText: {
    isString: {
      if: body("fullText").exists(),
      errorMessage: "Fulltext should be a string!",
    },
    isLength: {
      if: body("fullText").exists(),
      options: {
        min: 0,
        max: 1500,
      },
      errorMessage: "FullText should contain from 0 to 1500 characters!",
    },
    trim: true,
  },
  weight: {
    isInt: {
      if: body("weight").exists(),
      options: { min: 1 },
      errorMessage: "Weight should be an integer and be greater than 0!",
    },
  },

  price: {
    isFloat: {
      if: body("price").exists(),
      options: { min: 1 },
      errorMessage: "Price should be float and be greater than 0!",
    },
  },
  discountPrice: {
    isFloat: {
      if: body("discountPrice").exists().notEmpty(),
      options: { min: 1 },
      errorMessage: "DiscountPrice should be a float and be greater than 0!",
    },
    custom: {
      if: body("discountPrice").exists(),
      options: async (value, { req }) => {
        const price = req.body.price;

        if (!price) return true;

        if (+value > +price) {
          throw new Error("DiscountPrice cannot be greater than the regular price!");
        }
        return true;
      },
    },
  },
  nutrients: {
    isObject: {
      if: body("nutriens").exists(),
      errorMessage: "Nutrients should be an object!",
    },
  },
  "nutrients.calories": {
    isFloat: {
      if: body("nutrients.calories").exists().notEmpty(),
      options: {
        min: 0,
      },
      errorMessage: "Calories should be an integer!",
    },
  },
  "nutrients.carbohydrates": {
    isFloat: {
      if: body("nutrients.carbohydrates").exists().notEmpty(),
      options: {
        min: 0,
      },
      errorMessage: "Carbohydrates should be an integer!",
    },
  },
  "nutrients.protein": {
    isFloat: {
      if: body("nutrients.protein").exists().notEmpty(),
      options: {
        min: 0,
      },
      errorMessage: "Protein should be an integer!",
    },
  },
  "nutrients.fats": {
    isFloat: {
      if: body("nutrients.fats").exists().notEmpty(),
      options: {
        min: 0,
      },
      errorMessage: "Fats should be an integer!",
    },
  },
  isVegan: {
    isBoolean: {
      if: body("isVegan").exists(),
      errorMessage: "IsVegan should be a boolean!",
    },
  },
  cookTime: {
    isInt: {
      if: body("cookTime").exists(),
      options: {
        min: 1,
      },
      errorMessage: "CookTime should be an integer and be greater than 0!",
    },
  },
  isNewProduct: {
    isBoolean: {
      if: body("isNewProduct").exists(),
      errorMessage: "IsNewProduct should be a boolean!",
    },
  },
  compound: {
    isArray: {
      if: body("compound").exists(),
      errorMessage: "Compound should be an array!",
    },
  },
  "compound.*": {
    matches: {
      if: body("compound").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage:
        "Compound item can contain only ukrainian and english letters, numbers and specials symbols!",
    },
    trim: true,
  },
};

export const productValidationStrictSchema = {
  ...productValidationSchema,
  title: {
    exists: {
      errorMessage: "Title is required",
      bail: true,
    },
    ...productValidationSchema.title,
  },
  category: {
    exists: {
      errorMessage: "Category is required",
      bail: true,
    },
    ...productValidationSchema.category,
  },
  description: {
    exists: {
      options: { values: "falsy" },
      errorMessage: "Description is required",
      bail: true,
    },
    ...productValidationSchema.description,
  },
  weight: {
    exists: {
      errorMessage: "Weight is required",
      bail: true,
    },
    ...productValidationSchema.weight,
  },
  price: {
    exists: {
      errorMessage: "Price is required",
      bail: true,
    },
    ...productValidationSchema.price,
  },
  isVegan: {
    exists: {
      errorMessage: "Isvegan is required!",
      bail: true,
    },
    ...productValidationSchema.isVegan,
  },
  cookTime: {
    exists: {
      errorMessage: "CookTime is required!",
      bail: true,
    },
    ...productValidationSchema.cookTime,
  },
};
