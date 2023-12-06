import { body } from "express-validator";

export const emailValidationSchema = {
  email: {
    exists: {
      errorMessage: "Email is required!",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email should be correct!",
    },
    normalizeEmail: true,
  },
};

export const passwordValidationSchema = {
  password: {
    exists: {
      errorMessage: "Password is required!",
      bail: true,
    },
    isString: {
      errorMessage: "Password should be a string!",
    },
    isStrongPassword: {
      options: { minLowercase: 0, minUppercase: 0 },
      errorMessage:
        "Password should contain at least 8 characters including numbers and letters and symbols",
    },
  },
};

export const loginValidationSchema = {
  ...emailValidationSchema,
  password: {
    exists: {
      errorMessage: "Password is required!",
      bail: true,
    },
    isString: {
      errorMessage: "Password should be a string!",
    },
  },
};

export const registerValidationSchema = {
  ...loginValidationSchema,
  name: {
    exists: {
      errorMessage: "Name is required!",
      bail: true,
    },
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
    exists: {
      errorMessage: "LastName is required!",
      bail: true,
    },
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
  password: {
    ...loginValidationSchema.password,
    isStrongPassword: {
      options: { minLowercase: 0, minUppercase: 0 },
      errorMessage:
        "Password should contain at least 8 characters including numbers and letters and symbols",
    },
  },
};

export const tokenValidationSchema = {
  refresh: {
    isJWT: {
      errorMessage: "incorrect refresh jwt token!",
    },
  },
};
