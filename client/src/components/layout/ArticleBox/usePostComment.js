import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../../services/apiComments";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const usePostComment = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => postComment(data),
    onSuccess: (data) => {
      toast.success("Коментар успішно додано. Він буде опублікований після модерації!");
      resetForm();
      queryClient.refetchQueries({ queryKey: ["article", data.articleID] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    postComment: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
