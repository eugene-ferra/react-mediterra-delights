import ProductDTO from "./productDTO.js";

export default class OrderDTO {
  constructor(responseOrder) {
    this.id = responseOrder._id;
    this.name = responseOrder.name;
    this.lastName = responseOrder.lastName;
    this.phone = responseOrder.phone;
    this.email = responseOrder.email;
    this.products = responseOrder.products.map((item) => ({
      product: new ProductDTO(item.id),
      quantity: item.quantity,
      price: item.price,
    }));
    this.deliveryType = responseOrder.deliveryType;
    this.deliveryAddress = {
      street: responseOrder?.deliveryAddress?.street || null,
      home: responseOrder?.deliveryAddress?.home || null,
      flat: responseOrder?.deliveryAddress?.flat || null,
    };
    this.pickupLocation = responseOrder?.pickupLocation || null;
    this.time = responseOrder.time;
    this.deliveryTime = responseOrder.deliveryTime;
    this.totalSum = responseOrder.totalSum;
    this.paymentType = responseOrder.paymentType;
    this.status = responseOrder.status;
    this.isPayed = responseOrder.isPayed;
    this.number = responseOrder.number;
  }
}
