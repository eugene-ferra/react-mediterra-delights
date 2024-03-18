import { ProductDTO } from "./productDTO.js";
export class OrderDTO {
  id;
  name;
  lastName;
  phone;
  products;
  deliveryType;
  deliveryAddress;
  pickupLocation;
  time;
  deliveryTime;
  totalSum;
  paymentType;
  status;
  isPayed;
  number;

  constructor(responseOrder) {
    this.id = responseOrder._id;
    this.name = responseOrder.name;
    this.lastName = responseOrder.lastName;
    this.phone = responseOrder.phone;
    this.products = responseOrder.products.map((item) => {
      return {
        product: new ProductDTO(item.id),
        quantity: item.quantity,
        price: item.price,
      };
    });
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
