const getOrderData = (req) => ({
  name: req.body.name,
  lastName: req.body.lastName,
  phone: req.body.phone,
  email: req.body.email,
  products: req.body.products,
  deliveryType: req.body.deliveryType,
  deliveryAddress: req.body.deliveryAddress,
  pickupLocation: req.body.pickupLocation,
  deliveryTime: req.body.deliveryTime,
  paymentType: req.body.paymentType,
});

export default getOrderData;
