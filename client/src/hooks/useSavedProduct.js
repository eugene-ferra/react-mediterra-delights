import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteProduct, saveProduct } from "../services/apiUsers";
import toast from "react-hot-toast";

export const useSavedProduct = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adding = useMutation({
    mutationFn: () => saveProduct(id),
    onSuccess: () => {
      toast.success("Товар успішно збережено!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["favouriteProducts"] });
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  const deleting = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      toast.success("Товар успішно видалено із улюблених! ");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["favouriteProducts"] });
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
