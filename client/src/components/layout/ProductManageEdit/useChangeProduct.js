import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchProduct } from "../../../services/apiProducts";
import toast from "react-hot-toast";

export const useChangeProduct = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const changing = useMutation({
    mutationFn: (data) => patchProduct(data.id, data.data),
    onSuccess: (data) => {
      toast.success("Товар успішно оновлено!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", data?.slug] });
      queryClient.invalidateQueries({ queryKey: ["product", data?.id] });
      resetForm && resetForm();
      navigate("/admin/products");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    changeProduct: changing.mutate,
    isChanging: changing.isPending,
    errors: errors,
  };
};
