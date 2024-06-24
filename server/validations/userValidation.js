import { body } from "express-validator";
import idValidationSchema from "./idValidation.js";

export const userValidationSchema = {
  name: {
    matches: {
      if: body("name").exists(),
      options: [/^[-'\p{L}]*$/u],
      errorMessage: "Будь-ласка, вкажіть коректне ім'я!",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Довжина ім'я має бути від 1 до 20 символів!",
    },
    toLowerCase: true,
  },
  lastName: {
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
      errorMessage: "Довжина прізвища має бути від 1 до 20 символів!",
    },
    toLowerCase: true,
  },
  phone: {
    isMobilePhone: {
      if: body("phone").exists().notEmpty(),
      options: ["uk-UA", { strictMode: false }],
      errorMessage: "Будь-ласка, вкажіть коректний телефон!",
    },
  },
  password: {
    isString: {
      if: body("password").exists(),
      errorMessage: "Некоректне значення!",
    },
    isStrongPassword: {
      options: { minLowercase: 0, minUppercase: 0 },
      errorMessage:
        "Пароль повинен мати хоча б 1 цифру, літеру та спеціальний символ, а також бути довшим за 8 символів",
    },
  },

  oldPassword: {
    exists: {
      if: body("password").exists(),
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isString: {
      errorMessage: "Некоректне значення!",
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
      errorMessage: "Кількість товарів має бути більшою за 0!",
    },
  },
};
