import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview } from "../../../services/apiReviews";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const usePostReview = (resetForm) => {
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => postReview(data),
    onSuccess: () => {
      toast.success("Відгук успішно додано. Він буде опублікований після модерації!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      resetForm();
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    postReview: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
