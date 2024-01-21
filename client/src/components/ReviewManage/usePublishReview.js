import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { patchReview } from "../../services/apiReviews";

export const usePublishReview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => patchReview(id, { isModerated: true }),
    onSuccess: () => {
      toast.success("Відгук успішно опубліковано!");
      queryClient.invalidateQueries("adminReviews");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  return {
    publishReview: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
