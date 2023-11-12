import { body, param } from "express-validator";

export const reviewValidationSchema = {
  review: {
    matches: {
      if: body("review").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage:
        "review can contain only ukrainian and english letters, numbers and specials symbols!",
    },
    isString: {
      if: body("review").exists(),
      errorMessage: "review should be a string!",
    },
    isLength: {
      if: body("review").exists(),
      options: {
        min: 1,
        max: 500,
      },
      errorMessage: "review must contain from 0 to 500 characters",
    },
    trim: true,
  },
  rating: {
    isIn: {
      if: body("rating").exists(),
      options: [[1, 2, 3, 4, 5]],
      errorMessage: "This value is not allowed!",
    },
  },
  isModerated: {
    isBoolean: {
      if: body("isModerated").exists(),
      errorMessage: "isModerated should be a boolean!",
    },
  },
};

export const postReviewValidationSchema = {
  ...reviewValidationSchema,
  review: {
    exists: {
      errorMessage: "review is required!",
    },
    ...reviewValidationSchema.review,
  },
  rating: {
    exists: {
      errorMessage: "rating is required!",
    },
    ...reviewValidationSchema.rating,
  },
  isModerated: {},
  id: {
    isMongoId: {
      if: param("id").exists(),
      errorMessage: "Incorrect review id!",
    },
  },
  productID: {
    exists: {
      errorMessage: "productID is required!",
      bail: true,
    },
    isMongoId: {
      errorMessage: "productID should be a mongo id!",
    },
  },
  userID: {
    exists: {
      errorMessage: "userID is required!",
      bail: true,
    },
    isMongoId: {
      errorMessage: "userID should be a mongo id!",
    },
  },
};
