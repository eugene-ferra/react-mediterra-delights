import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOrder } from "../../services/apiOrders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCreateOrder = (clearCart, resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      await postOrder(data);
      await clearCart();
    },
    onSuccess: () => {
      toast.success("Ваше замовлення прийнято!");
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

  return {
    createOrder: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
