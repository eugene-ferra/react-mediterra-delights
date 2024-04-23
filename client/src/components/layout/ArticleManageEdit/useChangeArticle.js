import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { patchArticle } from "../../../services/apiArticles";

export const useChangeArticle = (editorRef) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      await patchArticle(data.id, data.data);
      await editorRef.current.uploadImages();
      await patchArticle(data.id, { markup: editorRef.current.getContent() });
    },
    onSuccess: (data) => {
      toast.success("Статтю успішно оновлено!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", data?.id] });
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
    isChanging: mutation.isPending,
    errors: errors,
  };
};
