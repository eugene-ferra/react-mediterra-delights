import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteArticle as deleteArticleApi } from "../../../services/apiArticles";

export const useDeleteArticle = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteArticleApi(id),
    onSuccess: () => {
      toast.success("Статтю успішно видалено!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate("/admin/articles");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    deleteArticle: mutation.mutate,
    isDeleting: mutation.isPending,
    errors: errors,
  };
};
