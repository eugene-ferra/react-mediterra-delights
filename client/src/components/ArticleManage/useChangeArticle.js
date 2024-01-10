import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { patchArticle } from "../../services/apiArticles";

export const useChangeArticle = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => patchArticle(data.id, data.data),
    onSuccess: () => {
      toast.success("Статтю успішно оновлено!");
      queryClient.invalidateQueries("adminArticles");
      navigate("/admin/articles");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    patchArticle: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
