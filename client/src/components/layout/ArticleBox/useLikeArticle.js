import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { likeArticle, unLikeArticle } from "../../../services/apiUsers";

export const useLikeArticle = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adding = useMutation({
    mutationFn: () => likeArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  const deleting = useMutation({
    mutationFn: () => unLikeArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  return {
    likeArticle: adding.mutate,
    isLiking: adding.isPending,
    unlikeArticle: deleting.mutate,
    isUnliking: deleting.isPending,
  };
};
