import { body, param } from "express-validator";

export const commentValidationSchema = {
  comment: {
    matches: {
      if: body("comment").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage:
        "comment can contain only ukrainian and english letters, numbers and specials symbols!",
    },
    isString: {
      if: body("comment").exists(),
      errorMessage: "comment should be a string!",
    },
    isLength: {
      if: body("comment").exists(),
      options: {
        min: 1,
        max: 500,
      },
      errorMessage: "comment must contain from 0 to 500 characters",
    },
    trim: true,
  },
  isModerated: {
    isBoolean: {
      if: body("isModerated").exists(),
      errorMessage: "isModerated should be a boolean!",
    },
  },
};

export const postCommentValidationSchema = {
  ...commentValidationSchema,
  comment: {
    exists: {
      errorMessage: "comment is required!",
    },
    ...commentValidationSchema.comment,
  },
  isModerated: {},
  id: {
    isMongoId: {
      if: param("id").exists(),
      errorMessage: "Incorrect comment id!",
    },
  },
  articleID: {
    exists: {
      errorMessage: "articleID is required!",
    },
    isMongoId: {
      errorMessage: "articleID should be a mongo id!",
    },
  },
  userID: {
    exists: {
      errorMessage: "userID is required!",
    },
    isMongoId: {
      errorMessage: "userID should be a mongo id!",
    },
  },
};
