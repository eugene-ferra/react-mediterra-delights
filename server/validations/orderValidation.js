import { body } from "express-validator";

export const orderProceedValidation = {
  isPayed: {
    isBoolean: {
      if: body("isPayed").exists(),
      errorMessage: "isPayed should be a boolean value!",
    },
  },
  status: {
    isIn: {
      if: body("status").exists(),
      options: [
        [
          "Замовлення в обробці",
          "Замволення скасовано",
          "Замовлення підтверджено",
          "Замовлення готове",
          "Замовлення прямує до вас",
          "Замовлення отримано",
        ],
      ],
      errorMessage: "This value is not allowed!",
    },
  },
};

export const orderValidationSchema = {
  name: {
    matches: {
      if: body("name").exists(),
      options: [/^[-'\p{L}]*$/u],
      errorMessage: "Name can contain only letters, ' and - symbols!",
    },
    isLength: {
      if: body("name").exists(),
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
      if: body("lastName").exists(),
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "lastName should contain 3-20 characters",
    },
    toLowerCase: true,
  },
  phone: {
    isMobilePhone: {
      if: body("phone").exists(),
      options: ["uk-UA", { strictMode: false }],
    },
  },
  email: {
    isEmail: {
      if: body("email").exists(),
      errorMessage: "Email should be correct!",
    },
    normalizeEmail: true,
  },
  products: {
    exists: {
      errorMessage: "Products is required!",
      bail: true,
    },
    isArray: {
      options: { min: 1 },
      errorMessage: "Products should be an array and contain products!",
    },
  },
  "products.*.id": {
    exists: {
      errorMessage: "Product id is required!",
      bail: true,
    },
    isMongoId: {
      errorMessage: "Product id should be a mongo id!",
    },
  },
  "products.*.quantity": {
    exists: {
      errorMessage: "Product quantity is required!",
      bail: true,
    },
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "Product quantity should be bigger than 0!",
    },
  },
  deliveryType: {
    isIn: {
      if: body("deliveryType").exists(),
      options: [["Самовивіз", "Доставка кур'єром"]],
      errorMessage: "This value is not allowed!",
    },
  },
  deliveryAddress: {
    isObject: {
      if: body("deliveryAddress").exists(),
      errorMessage: "DeliveryAddress should be an object!",
    },
  },
  "deliveryAddress.street": {
    exists: {
      if: body("deliveryType").equals("Доставка кур'єром"),
      errorMessage: "street is required!",
    },
    matches: {
      options: [/^[-'\p{L}]*$/u],
      errorMessage: "String can contain only letters, ' and - symbols!",
    },
  },
  "deliveryAddress.home": {
    exists: {
      if: body("deliveryType").equals("Доставка кур'єром"),
      errorMessage: "home is required!",
    },
    matches: {
      options: [/^[0-9]+[A-Za-z]*([\/\-][0-9]+[A-Za-z]*)*$/],
      errorMessage: "Invalid format of home!",
    },
  },
  "deliveryAddress.flat": {
    matches: {
      if: body("deliveryAddress.flat").exists(),
      options: [/^[0-9]+[A-Z]*$/],
      errorMessage: "Invalid format of flat",
    },
  },
  pickupLocation: {
    isIn: {
      if: body("pickupLocation").exists(),
      options: [["Харків, вул. Сумська, 123", "Харків, вул. Пушкінська 55"]],
      errorMessage: "This value is not allowed!",
    },
  },
  deliveryTime: {
    isISO8601: {
      if: body("deliveryTime").exists(),
      options: {
        strictMode: true,
      },
      errorMessage: "invalid format of date!",
    },
    custom: {
      options: (value) => {
        const openingTime = 8;
        const closingTime = 22;

        const date = new Date(value);
        const hours = date.getUTCHours();
        const currDate = date.getUTCDay();

        if (new Date(Date.now()).getUTCDay() !== currDate) {
          throw new Error("Invalid date!");
        }
        if (hours < openingTime || hours >= closingTime) {
          throw new Error("Our delivery service is closed. Try again later!");
        }

        return true;
      },
    },
  },
  paymentType: {
    isIn: {
      if: body("paymentType").exists(),
      options: [["При отриманні", "Карткою на сайті"]],
      errorMessage: "This value is not allowed!",
    },
  },
};

export const orderValidationStrictSchema = {
  ...orderValidationSchema,
  name: {
    exists: {
      errorMessage: "Name is required!",
      bail: true,
    },
    ...orderValidationSchema.name,
  },
  lastName: {
    exists: {
      errorMessage: "LastName is required!",
      bail: true,
    },
    ...orderValidationSchema.lastName,
  },
  phone: {
    exists: {
      errorMessage: "Phone is required!",
      bail: true,
    },
    ...orderValidationSchema.phone,
  },
  email: {
    exists: {
      errorMessage: "Email is required!",
      bail: true,
    },
    ...orderValidationSchema.email,
  },
  deliveryType: {
    exists: {
      errorMessage: "DeliveryType is required!",
      bail: true,
    },
    ...orderValidationSchema.deliveryType,
  },
  deliveryAddress: {
    exists: {
      if: body("deliveryType").equals("Доставка кур'єром"),
      errorMessage: "DeliveryAddres is required!",
    },
    ...orderValidationSchema.deliveryAddress,
  },
  pickupLocation: {
    exists: {
      if: body("deliveryType").equals("Самовивіз"),
      errorMessage: "pickupLocation is required!",
    },
    ...orderValidationSchema.pickupLocation,
  },
  deliveryTime: {
    exists: {
      errorMessage: "deliveryTime is required!",
    },
    ...orderValidationSchema.deliveryTime,
  },
  paymentType: {
    exists: {
      errorMessage: "paymentType is required!",
    },
    ...orderValidationSchema.paymentType,
  },
};
