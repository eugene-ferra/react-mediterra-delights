import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";

export const useDeleteProduct = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteProductApi(id),
    onSuccess: () => {
      toast.success("Товар успішно видалено!");
      queryClient.invalidateQueries("adminProducts");
      navigate("/admin/products");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    deleteProduct: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
