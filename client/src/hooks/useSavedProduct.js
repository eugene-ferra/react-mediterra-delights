import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteProduct, saveProduct } from "../services/apiUsers";

export const useSavedProduct = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adding = useMutation({
    mutationFn: () => saveProduct(id),
    onSuccess: () => {
      toast.success("Товар успішно збережено!");
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("favouriteProducts");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  const deleting = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      toast.success("Товар успішно видалено із улюблених! HEDHEHEH");
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("favouriteProducts");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  return {
    saveProduct: adding.mutate,
    isSaving: adding.isPending,
    deleteProduct: deleting.mutate,
    isDeleting: deleting.isPending,
  };
};
