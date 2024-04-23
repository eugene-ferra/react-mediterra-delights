import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postProduct } from "../../../services/apiProducts";
import toast from "react-hot-toast";

export const useAddProduct = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adding = useMutation({
    mutationFn: (data) => postProduct(data),
    onSuccess: () => {
      toast.success("Товар успішно додано!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetForm();
      navigate("/admin/products");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    addProduct: adding.mutate,
    isAdding: adding.isPending,
    errors: errors,
  };
};
