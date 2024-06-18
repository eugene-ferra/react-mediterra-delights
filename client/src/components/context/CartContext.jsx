import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartCookie = Cookies.get("cart");
    if (cartCookie) {
      setCart(JSON.parse(cartCookie));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
  );
};

export default CartContext;
