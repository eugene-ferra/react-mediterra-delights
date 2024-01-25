import { body } from "express-validator";
import { idValidationSchema } from "./idValidation.js";

export const userValidationSchema = {
  name: {
    matches: {
      if: body("name").exists(),
      options: [/^[-'\p{L}]*$/u],
      errorMessage: "Name can contain only letters, ' and - symbols!",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Name should contain 3-20 characters",
    },
    toLowerCase: true,
  },
  lastName: {
    matches: {
      if: body("lastName").exists(),
      options: [/^[-'\p{L}]*$/u],
      errorMessage: "LastName can contain only letters, ' and - symbols!",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Name should contain 3-20 characters",
    },
    toLowerCase: true,
  },
  phone: {
    isMobilePhone: {
      if: body("phone").notEmpty(),
      options: ["uk-UA", { strictMode: false }],
    },
  },
  password: {
    isString: {
      if: body("password").exists(),
      errorMessage: "Password should be a string!",
    },
    isStrongPassword: {
      options: { minLowercase: 0, minUppercase: 0 },
      errorMessage:
        "Password should contain at least 8 characters including numbers and letters and symbols",
    },
  },

  oldPassword: {
    exists: {
      if: body("password").exists(),
      errorMessage: "oldPassword is required!",
      bail: true,
    },
    isString: {
      errorMessage: "Password should be a string!",
    },
  },
};

export const cartValidationSchema = {
  ...idValidationSchema,
  quantity: {
    isInt: {
      if: body("quantity").exists(),
      options: {
        min: 1,
      },
      errorMessage: "quantity should be an integer and be greater than 0!",
    },
  },
};
