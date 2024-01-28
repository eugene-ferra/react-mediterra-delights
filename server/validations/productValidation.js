import { body, param } from "express-validator";

export const productValidationSchema = {
  id: {
    isMongoId: {
      if: param("id").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  title: {
    matches: {
      if: body("title").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    isString: {
      if: body("title").exists(),
      errorMessage: "Некоректне значення!",
    },
    isLength: {
      if: body("title").exists(),
      options: {
        min: 3,
        max: 60,
      },
      errorMessage: "Довжина назви має бути від 1 до 60 символів!",
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
      errorMessage: "Некоректне значення!",
    },
  },
  description: {
    matches: {
      if: body("description").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    isString: {
      if: body("description").exists(),
      errorMessage: "Некоректне значення!",
    },
    isLength: {
      if: body("description").exists(),
      options: {
        min: 0,
        max: 350,
      },
      errorMessage: "Довжина тексту має бути від 1 до 350 символів!",
    },
    trim: true,
  },
  fullText: {
    isString: {
      if: body("fullText").exists(),
      errorMessage: "Некоректне значення!",
    },
    isLength: {
      if: body("fullText").exists(),
      options: {
        min: 0,
        max: 1500,
      },
      errorMessage: "Довжина тексту має бути від 1 до 1500 символів!",
    },
    trim: true,
  },
  weight: {
    isInt: {
      if: body("weight").exists(),
      options: { min: 1 },
      errorMessage: "Вага товару має бути більше за 0!",
    },
  },

  price: {
    isFloat: {
      if: body("price").exists(),
      options: { min: 1 },
      errorMessage: "Ціна товару має бути більше за 0!",
    },
  },
  discountPrice: {
    isFloat: {
      if: body("discountPrice").exists().notEmpty(),
      options: { min: 1 },
      errorMessage: "Знижка має бути більше за 0!",
    },
    custom: {
      if: body("discountPrice").exists(),
      options: async (value, { req }) => {
        const price = req.body.price;

        if (!price) return true;

        if (+value > +price) {
          throw new Error("Знижка не може бути більшою за ціну!");
        }
        return true;
      },
    },
  },
  nutrients: {
    isObject: {
      if: body("nutriens").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  "nutrients.calories": {
    isFloat: {
      if: body("nutrients.calories").exists().notEmpty(),
      options: {
        min: 0,
      },
      errorMessage: "Некоректне значення!",
    },
  },
  "nutrients.carbohydrates": {
    isFloat: {
      if: body("nutrients.carbohydrates").exists().notEmpty(),
      options: {
        min: 0,
      },
      errorMessage: "Некоректне значення!",
    },
  },
  "nutrients.protein": {
    isFloat: {
      if: body("nutrients.protein").exists().notEmpty(),
      options: {
        min: 0,
      },
      errorMessage: "Некоректне значення!",
    },
  },
  "nutrients.fats": {
    isFloat: {
      if: body("nutrients.fats").exists().notEmpty(),
      options: {
        min: 0,
      },
      errorMessage: "Некоректне значення!",
    },
  },
  isVegan: {
    isBoolean: {
      if: body("isVegan").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  cookTime: {
    isInt: {
      if: body("cookTime").exists(),
      options: {
        min: 1,
      },
      errorMessage: "Час приготування має бути більше за 0!",
    },
  },
  isNewProduct: {
    isBoolean: {
      if: body("isNewProduct").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  compound: {
    isArray: {
      if: body("compound").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  "compound.*": {
    matches: {
      if: body("compound").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    trim: true,
  },
};

export const productValidationStrictSchema = {
  ...productValidationSchema,
  title: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...productValidationSchema.title,
  },
  category: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...productValidationSchema.category,
  },
  description: {
    exists: {
      options: { values: "falsy" },
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...productValidationSchema.description,
  },
  weight: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...productValidationSchema.weight,
  },
  price: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...productValidationSchema.price,
  },
  isVegan: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...productValidationSchema.isVegan,
  },
  cookTime: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...productValidationSchema.cookTime,
  },
};
