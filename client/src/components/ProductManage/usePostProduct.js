import { useMutation } from "@tanstack/react-query";
import { postProduct } from "../../services/apiProducts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const usePostProduct = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => postProduct(data),
    onSuccess: () => {
      toast.success("Товар успішно додано!");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    postProduct: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
