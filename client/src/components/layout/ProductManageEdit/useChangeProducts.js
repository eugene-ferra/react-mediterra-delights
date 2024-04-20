import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { patchProduct } from "../../../services/apiProducts";

export const useChangeProduct = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => patchProduct(data.id, data.data),
    onSuccess: () => {
      toast.success("Товар успішно оновлено!");
      queryClient.invalidateQueries("adminProducts");
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("product");
      navigate("/admin/products");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    patchProduct: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
