import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postArticle } from "../../services/apiArticles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const usePostArticle = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => postArticle(data),
    onSuccess: () => {
      toast.success("Cтаттю успішно додано!");
      queryClient.invalidateQueries("adminArticles");
      resetForm();
      navigate("/admin/articles");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    postArticle: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
