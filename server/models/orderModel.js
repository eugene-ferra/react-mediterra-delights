import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    minLenght: [3, "User's name must contain at least 3 characters!"],
    minLenght: [20, "User's name must not contain more than 40 characters!"],
    trim: true,
    required: [true, "Order must have a user name!"],
  },
  lastName: {
    type: String,
    minLenght: [3, "User's lastname must contain at least 3 characters!"],
    minLenght: [20, "User's lastname must not contain more than 40 characters!"],
    trim: true,
    required: [true, "Order must have a user last name!"],
  },
  phone: {
    type: String,
    required: [true, "Order must have user phone!"],
  },
  email: {
    type: String,
    required: [true, "Order must have user email!"],
  },
  products: [
    {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        requireq: [true, "each product must have a total price!"],
      },
    },
  ],
  deliveryType: {
    type: String,
    default: "user",
    enum: ["Самовивіз", "Доставка кур'єром"],
  },
  deliveryAddress: {
    street: {
      type: String,
      required: function () {
        return this.deliveryType === "Доставка кур'єром";
      },
    },
    home: {
      type: String,
      required: function () {
        return this.deliveryType === "Доставка кур'єром";
      },
    },
    flat: {
      type: String,
    },
  },
  pickupLocation: {
    type: String,
    enum: {
      values: [
        "Харків, вул. Сумська, 123",
        "Харків, вул. Григорія Сковороди, 55",
        "Харків, вул. Мироносицька, 65",
      ],
      message: "{VALUE} is not supported!",
    },
    required: [
      function () {
        return this.deliveryType === "Самовивіз";
      },
      "order must have pickupLocation!",
    ],
  },
  time: {
    type: Date,
    required: [true, "order must contain time"],
    default: Date.now(),
  },
  deliveryTime: {
    type: Date,
    required: [true, "order must contain deliveryTime"],
  },
  totalSum: {
    type: Number,
    required: [true, "Order must have totalSum!"],
  },
  paymentType: {
    type: String,
    required: [true, "Order  must have a payment type!"],
    enum: {
      values: ["При отриманні", "Карткою на сайті"],
    },
  },
  status: {
    type: String,
    required: [true, "Order must have a status!"],
    enum: {
      values: [
        "Замовлення в обробці",
        "Замовлення скасовано",
        "Замовлення підтверджено",
        "Замовлення готове",
        "Замовлення прямує до вас",
        "Замовлення отримано",
      ],
    },
  },
  isPayed: {
    type: Boolean,
    default: false,
  },
  number: {
    type: String,
    required: [true, "order must have unique number!"],
  },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
