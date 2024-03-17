import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCheckout, postOrder } from "../../services/apiOrders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

export const useCreateOrder = (clearCart, resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adding = useMutation({
    mutationFn: async (data) => {
      await postOrder(data);
      await clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries("adminArticles");
      queryClient.invalidateQueries("articles");
      queryClient.invalidateQueries("article");

      resetForm();
      navigate("/order/success");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  const creating = useMutation({
    mutationFn: async (data) => {
      const { session } = await createCheckout(data);
      const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_SECRET}`);

      await clearCart();
      await stripe.redirectToCheckout({ sessionId: session.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("adminArticles");
      queryClient.invalidateQueries("articles");
      queryClient.invalidateQueries("article");

      resetForm();
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    createOrder: adding.mutate,
    createCheckout: creating.mutate,
    isLoading: adding.isPending || creating.isPending,
    errors: errors,
  };
};
