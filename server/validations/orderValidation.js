import { body } from "express-validator";

export const orderProceedValidation = {
  isPayed: {
    isBoolean: {
      if: body("isPayed").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  status: {
    isIn: {
      if: body("status").exists(),
      options: [
        [
          "Замовлення в обробці",
          "Замовлення скасовано",
          "Замовлення підтверджено",
          "Замовлення готове",
          "Замовлення прямує до вас",
          "Замовлення отримано",
        ],
      ],
      errorMessage: "Некоректне значення!",
    },
  },
};

export const orderValidationSchema = {
  name: {
    matches: {
      if: body("name").exists(),
      options: [/^[-'\p{L}]*$/u],
      errorMessage: "Вкажіть коректне ім'я",
    },
    isLength: {
      if: body("name").exists(),
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
      errorMessage: "Будь-ласка, вкажіть коректне ім'я!",
    },
    isLength: {
      if: body("lastName").exists(),
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Довжина прізвища має бути від 1 до 100 символів!",
    },
    toLowerCase: true,
  },
  phone: {
    isMobilePhone: {
      if: body("phone").exists(),
      options: ["uk-UA", { strictMode: false }],
      errorMessage: "Вкажіть коректний телефон!",
    },
  },
  email: {
    isEmail: {
      if: body("email").exists(),
      errorMessage: "Вкажіть коректний email!",
    },
    normalizeEmail: true,
  },
  deliveryType: {
    isIn: {
      if: body("deliveryType").exists(),
      options: [["Самовивіз", "Доставка кур'єром"]],
      errorMessage: "Некоректне значення!",
    },
  },
  products: {
    isArray: {
      if: body("products").exists(),
      options: { min: 1 },
      errorMessage: "Некоректне значення!",
    },
  },
  "products.*.id": {
    isMongoId: {
      if: body("products").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  "products.*.quantity": {
    isInt: {
      if: body("products").exists(),
      options: {
        min: 1,
      },
      errorMessage: "Кількість товарів має бути більше ніж 0!",
    },
  },
  deliveryAddress: {
    isObject: {
      if: body("deliveryAddress").exists(),
      errorMessage: "Некоректне значення!",
    },
  },
  "deliveryAddress.street": {
    exists: {
      if: body("deliveryType").equals("Доставка кур'єром"),
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    matches: {
      options: [/^([\wа-яёіїА-ЯЁІЇ\s-']+)$/i],
      errorMessage: "Будь-ласка, вкажіть коректну вулицю!",
    },
    isLength: {
      options: {
        min: 1,
      },
      errorMessage: "Будь-ласка, вкажіть коректну вулицю!",
    },
  },
  "deliveryAddress.home": {
    exists: {
      if: body("deliveryType").equals("Доставка кур'єром"),
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    matches: {
      options: [/^([\wа-яёіїА-ЯЁІЇ\s-/']+)$/i],
      errorMessage: "Будь-ласка, вкажіть коректний номер будинку!",
    },
  },
  "deliveryAddress.flat": {
    matches: {
      if: body("deliveryAddress.flat").exists().notEmpty(),
      options: [/^([\wа-яёіїА-ЯЁІЇ\s-/']+)$/i],
      errorMessage: "Будь-ласка, вкажіть коректний номер квартири!",
    },
  },
  pickupLocation: {
    isIn: {
      if: body("pickupLocation").exists(),
      options: [["Харків, вул. Сумська, 123", "Харків, вул. Пушкінська 55"]],
      errorMessage: "Некоректне значення!",
    },
  },
  deliveryTime: {
    isISO8601: {
      if: body("deliveryTime").exists(),
      options: {
        strictMode: true,
      },
      errorMessage: "Некоректне значення!",
    },
    custom: {
      options: (value) => {
        const openingTime = 8;
        const closingTime = 23;

        const date = new Date(value);
        const hours = date.getUTCHours();
        const currentDate = new Date(Date.now());

        if (date <= currentDate) {
          throw new Error("Неможливо обрати дату та час, які вже минули");
        }

        if (hours < openingTime || hours > closingTime) {
          throw new Error("Ми вже зачинені! Спробуйте зробити замовлення в інший час!");
        }

        return true;
      },
    },
  },
  paymentType: {
    isIn: {
      if: body("paymentType").exists(),
      options: [["При отриманні", "Карткою на сайті"]],
      errorMessage: "Некоректне значення!",
    },
  },
};

export const orderValidationStrictSchema = {
  ...orderValidationSchema,
  name: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...orderValidationSchema.name,
  },
  lastName: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...orderValidationSchema.lastName,
  },
  phone: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...orderValidationSchema.phone,
  },
  email: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...orderValidationSchema.email,
  },
  deliveryType: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...orderValidationSchema.deliveryType,
  },
  deliveryAddress: {
    exists: {
      if: body("deliveryType").equals("Доставка кур'єром"),
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    ...orderValidationSchema.deliveryAddress,
  },
  products: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isArray: {
      options: { min: 1 },
      errorMessage: "Некоректне значення!",
    },
  },
  "products.*.id": {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isMongoId: {
      errorMessage: "Некоректне значення!",
    },
  },
  "products.*.quantity": {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "Кількість товарів має бути більше за 0!",
    },
  },
  pickupLocation: {
    exists: {
      if: body("deliveryType").equals("Самовивіз"),
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    ...orderValidationSchema.pickupLocation,
  },
  deliveryTime: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    ...orderValidationSchema.deliveryTime,
  },
  paymentType: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
    },
    ...orderValidationSchema.paymentType,
  },
};
