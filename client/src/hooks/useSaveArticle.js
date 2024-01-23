import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveArticle, deleteArticle } from "../services/apiUsers";

export const useSaveArticle = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adding = useMutation({
    mutationFn: () => saveArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success("Стаття успішно збережена!");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  const deleting = useMutation({
    mutationFn: () => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success("Стаття успішно видалена зі збережених!");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  return {
    saveArticle: adding.mutate,
    isSaving: adding.isPending,
    deleteArticle: deleting.mutate,
    isDeleting: deleting.isPending,
  };
};
