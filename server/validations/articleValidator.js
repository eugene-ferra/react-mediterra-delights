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
        min: 1,
        max: 100,
      },
      errorMessage: "Title must contain from 0 to 60 characters",
    },
    trim: true,
  },
  topic: {
    isIn: {
      if: body("topic").exists(),
      options: [["Рецепти", "Поради", "Новини", "Інше"]],
      errorMessage: "This value is not allowed!",
    },
  },
  markup: {
    isString: {
      if: body("markup").exists(),
      errorMessage: "markup should be a string!",
    },
    isLength: {
      if: body("markup").exists(),
      options: {
        min: 1,
      },
      errorMessage: "markup cannot be empty",
    },
  },
  previewText: {
    matches: {
      if: body("previewText").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage:
        "PreviewText can contain only ukrainian and english letters, numbers and specials symbols!",
    },
    isString: {
      if: body("previewText").exists(),
      errorMessage: "PreviewText should be a string!",
    },
    isLength: {
      if: body("previewText").exists(),
      options: {
        min: 1,
        max: 200,
      },
      errorMessage: "PreviewText must contain from 0 to 60 characters",
    },
    trim: true,
  },
};

export const articleValidationStrictSchema = {
  ...articleValidationSchema,
  title: {
    exists: {
      errorMessage: "Title is required!",
      bail: true,
    },
    ...articleValidationSchema.title,
  },
  topic: {
    exists: {
      errorMessage: "topic is required!",
      bail: true,
    },
    ...articleValidationSchema.topic,
  },
  markup: {
    exists: {
      errorMessage: "markup is required!",
      options: {
        values: "falsy",
      },
      bail: true,
    },
    ...articleValidationSchema.markup,
  },
  previewText: {
    exists: {
      errorMessage: "previewText is required!",
      bail: true,
    },
    ...articleValidationSchema.previewText,
  },
};
