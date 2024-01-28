import { body, param } from "express-validator";

export const commentValidationSchema = {
  comment: {
    matches: {
      if: body("comment").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    isString: {
      if: body("comment").exists(),
      errorMessage: "Некоректне значення!",
    },
    isLength: {
      if: body("comment").exists(),
      options: {
        min: 1,
        max: 500,
      },
      errorMessage: "Довжина коментаря має бути від 1 до 500 символів!",
    },
    trim: true,
  },
  isModerated: {
    isBoolean: {
      if: body("isModerated").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
};

export const postCommentValidationSchema = {
  ...commentValidationSchema,
  comment: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    ...commentValidationSchema.comment,
  },
  isModerated: {},
  id: {
    isMongoId: {
      if: param("id").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  articleID: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    isMongoId: {
      errorMessage: "Некоректне значення!",
    },
  },
  userID: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    isMongoId: {
      errorMessage: "Некоректне значення!",
    },
  },
};
