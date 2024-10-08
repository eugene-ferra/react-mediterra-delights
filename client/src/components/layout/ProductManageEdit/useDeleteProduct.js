import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../services/apiProducts";
import toast from "react-hot-toast";

export const useDeleteProduct = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleting = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Товар успішно видалено!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
    deleteProduct: deleting.mutate,
    isDeleting: deleting.isPending,
    errors: errors,
  };
};
