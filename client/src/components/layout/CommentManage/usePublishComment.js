import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { patchComment } from "../../../services/apiComments";

export const usePublishComment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => patchComment(id, { isModerated: true }),
    onSuccess: () => {
      toast.success("Коментар успішно опубліковано!");
      queryClient.refetchQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  return {
    publishComment: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
