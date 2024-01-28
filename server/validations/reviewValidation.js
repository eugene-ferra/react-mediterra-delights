import { body, param } from "express-validator";

export const reviewValidationSchema = {
  review: {
    matches: {
      if: body("review").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    isString: {
      if: body("review").exists(),
      errorMessage: "Некоректне значення!",
    },
    isLength: {
      if: body("review").exists(),
      options: {
        min: 1,
        max: 500,
      },
      errorMessage: "Довжина відгуку має бути від 1 до 500 символів!",
    },
    trim: true,
  },
  rating: {
    isIn: {
      if: body("rating").exists(),
      options: [[1, 2, 3, 4, 5]],
      errorMessage: "Некоректне значення!",
    },
  },
  isModerated: {
    isBoolean: {
      if: body("isModerated").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
};

export const postReviewValidationSchema = {
  ...reviewValidationSchema,
  review: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    ...reviewValidationSchema.review,
  },
  rating: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    ...reviewValidationSchema.rating,
  },
  isModerated: {},
  id: {
    isMongoId: {
      if: param("id").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  productID: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isMongoId: {
      errorMessage: "Некоректне значення!",
    },
  },
  userID: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isMongoId: {
      errorMessage: "Некоректне значення!",
    },
  },
};
