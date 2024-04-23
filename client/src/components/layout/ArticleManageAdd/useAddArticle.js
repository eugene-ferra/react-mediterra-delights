import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchArticle, postArticle } from "../../../services/apiArticles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAddArticle = (resetForm, editorRef) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await postArticle(data);
      await editorRef.current.uploadImages();
      await patchArticle(response.id, { markup: editorRef.current.getContent() });
    },
    onSuccess: () => {
      toast.success("Cтаттю успішно додано!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
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
