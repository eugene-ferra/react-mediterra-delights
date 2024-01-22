import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import Cookies from "js-cookie";
import { useContext } from "react";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  addToCart as addToCartApi,
  deleteFromCart as deleteFromCartApi,
} from "../services/apiUsers";
import toast from "react-hot-toast";

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adding = useMutation({
    mutationFn: (newItem) => addToCartApi(newItem.id, newItem.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  const deleting = useMutation({
    mutationFn: (itemId) => deleteFromCartApi(itemId),
    onSuccess: () => {
      toast.success("Товар успішно видалено із кошика!");
      queryClient.invalidateQueries("user");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  const addToCart = (newItem) => {
    if (cart.length === 0 || cart.findIndex((item) => item.id === newItem.id) === -1) {
      const newData = [...cart, newItem];
      setCart([...cart, newItem]);
      Cookies.set("cart", JSON.stringify(newData));
      toast.success("Товар успішно додано до кошика!");
    }
  };

  const deleteFromCart = (itemId) => {
    if (cart.findIndex((item) => item.id === itemId) !== -1) {
      const newData = cart.filter((item) => item.id !== itemId);
      setCart(newData);
      Cookies.set("cart", JSON.stringify(newData));
      toast.success("Товар успішно видалено із кошика!");
    }
  };

  const isInCookieCart = (itemId) => {
    return cart.findIndex((item) => item.id === itemId) !== -1;
  };

  const isInCart = (itemId) => {
    return user?.cart?.findIndex((item) => item.id === itemId) !== -1;
  };

  return {
    cart: user ? user?.cart : cart,
    addToCart: user ? adding.mutate : addToCart,
    deleteFromCart: user ? deleting.mutate : deleteFromCart,
    isInCart: user ? isInCart : isInCookieCart,
    isAdding: user ? adding.isPending : false,
    isDeleting: user ? deleting.isPending : false,
  };
};
