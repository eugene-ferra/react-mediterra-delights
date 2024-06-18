import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCheckout, postOrder } from "../../../services/apiOrders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../../hooks/useCart";

export const useCreateOrder = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearCart } = useCart();

  const adding = useMutation({
    mutationFn: async (data) => {
      const order = await postOrder(data);
      return order;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      clearCart();
      resetForm();
      navigate(`/order/success/${data?.number}`);
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
      await stripe.redirectToCheckout({ sessionId: session.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });

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
