import { body } from "express-validator";

export const emailValidationSchema = {
  email: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isEmail: {
      errorMessage: "Вкажіть коректний e-mail!",
    },
    normalizeEmail: true,
  },
};

export const passwordValidationSchema = {
  password: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isString: {
      errorMessage: "Некоректне значення!",
    },
    isStrongPassword: {
      options: { minLowercase: 0, minUppercase: 0 },
      errorMessage:
        "Пароль повинен мати хоча б 1 цифру, літеру та спеціальний символ, а також бути довшим за 8 символів",
    },
  },
};

export const loginValidationSchema = {
  ...emailValidationSchema,
  password: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isString: {
      errorMessage: "Некоректне значення!",
    },
  },
};

export const registerValidationSchema = {
  ...loginValidationSchema,
  name: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    matches: {
      if: body("name").exists(),
      options: [/^[-'\p{L}]*$/u],
      errorMessage: "Будь-ласка, вкажіть коректне ім'я!",
      isLength: {
        options: {
          min: 3,
          max: 20,
        },
        errorMessage: "Ім'я має бути від 3 до 20 символів!",
      },
      trim: true,
    },
    isLength: {
      if: body("name").exists(),
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Довжина ім'я має бути від 3 до 20 символів!",
    },
    toLowerCase: true,
  },
  lastName: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    matches: {
      if: body("lastName").exists(),
      options: [/^[-'\p{L}]*$/u],
      errorMessage: "Будь-ласка, вкажіть коректне прізвище!",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Довжина прізвища має бути від 3 до 20 символів!",
    },
    toLowerCase: true,
  },
  password: {
    ...loginValidationSchema.password,
    isStrongPassword: {
      options: { minLowercase: 0, minUppercase: 0 },
      errorMessage:
        "Пароль повинен мати хоча б 1 цифру, літеру та спеціальний символ, а також бути довшим за 8 символів",
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
