import { body, checkSchema, param } from "express-validator";

export const articleValidationSchema = {
  id: {
    isMongoId: {
      if: param("id").exists(),
      errorMessage: "Incorrect article id!",
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
        min: 1,
        max: 100,
      },
      errorMessage: "Довжина заголовку має бути від 1 до 100 символів!",
    },
    trim: true,
  },
  topic: {
    isIn: {
      if: body("topic").exists(),
      options: [["Рецепти", "Поради", "Новини", "Інше"]],
      errorMessage: "Некоректне значення!",
    },
  },
  previewText: {
    matches: {
      if: body("previewText").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    isString: {
      if: body("previewText").exists(),
      errorMessage: "Некоректне значення!",
    },
    isLength: {
      if: body("previewText").exists(),
      options: {
        min: 1,
        max: 200,
      },
      errorMessage: "Довжина тексту має бути від 1 до 100 символів!",
    },
    trim: true,
  },
};

export const articleValidationStrictSchema = {
  ...articleValidationSchema,
  title: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...articleValidationSchema.title,
  },
  topic: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...articleValidationSchema.topic,
  },
  previewText: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...articleValidationSchema.previewText,
  },
};
