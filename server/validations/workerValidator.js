import { body, param } from "express-validator";

export const workerValidationSchema = {
  id: {
    isMongoId: {
      if: param("id").exists(),
      errorMessage: "Incorrect article id!",
    },
  },
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
        max: 40,
      },
      errorMessage: "Довжина прізвища має бути від 1 до 40 символів!",
    },
    toLowerCase: true,
  },
  positionType: {
    isIn: {
      if: body("positionType").exists(),
      options: [
        [
          "Адміністрація",
          "Кухонний персонал",
          "Обслуговуючий персонал",
          "Технічний персонал",
          "Інші працівники",
        ],
      ],
      errorMessage: "Некоректне значення!",
    },
  },
  position: {
    matches: {
      if: body("position").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    isLength: {
      options: {
        min: 3,
        max: 80,
      },
      errorMessage: "Допустима кількість символів -  від 3 до 80 символів!",
    },
  },
  summary: {
    matches: {
      if: body("summary").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    isLength: {
      options: {
        min: 1,
        max: 1000,
      },
      errorMessage: "Допустима кількість символів -  від 1 до 1000 символів!",
    },
  },
  additionalInfo: {
    matches: {
      if: body("additionalInfo").exists(),
      options: [/^[\s\d\p{L}\p{P}]*$/u],
      errorMessage: "Використовуйте лише кирилицю, латинські символи та цифри!",
    },
    isLength: {
      options: {
        min: 0,
        max: 700,
      },
      errorMessage: "Допустима кількість символів -  від 1 до 700 символів!",
    },
  },
  dateOfBirth: {
    isISO8601: {
      if: body("dateOfBirth").exists(),
      options: {
        strictMode: true,
      },
      errorMessage: "Некоректне значення!",
    },
    custom: {
      options: (value) => {
        const date = new Date(value);

        const currentDate = new Date(Date.now());

        if (date >= currentDate) {
          throw new Error("Неможливо обрати дату та час, які ще не настали!");
        }

        return true;
      },
    },
  },
  startWorkDate: {
    isISO8601: {
      if: body("startWorkDate").exists(),
      options: {
        strictMode: true,
      },
      errorMessage: "Некоректне значення!",
    },
    custom: {
      options: (value) => {
        const date = new Date(value);

        const currentDate = new Date(Date.now());

        if (date >= currentDate) {
          throw new Error("Неможливо обрати дату та час, які ще не настали!");
        }

        return true;
      },
    },
  },
};

export const workerValidationStrictSchema = {
  ...workerValidationSchema,
  name: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...workerValidationSchema.name,
  },
  lastName: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...workerValidationSchema.lastName,
  },
  positionType: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...workerValidationSchema.positionType,
  },
  position: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...workerValidationSchema.position,
  },
  summary: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...workerValidationSchema.summary,
  },
  dateOfBirth: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...workerValidationSchema.dateOfBirth,
  },
  startWorkDate: {
    exists: {
      errorMessage: "Поле обов'язкове для заповнення!",
      bail: true,
    },
    ...workerValidationSchema.startWorkDate,
  },
};
