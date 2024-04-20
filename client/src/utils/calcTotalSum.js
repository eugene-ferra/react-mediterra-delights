export function calcTotalSum(cart = [], products = []) {
  if (cart.length == 0 || products.length == 0) return 0;

  return cart?.reduce((acc, item) => {
    const product = products?.find((p) => p?.id === item?.id);
    if (product) {
      const price = product.price;
      acc += price * item.quantity;
    }
    return acc;
  }, 0);
}
