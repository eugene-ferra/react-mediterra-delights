import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteComment as deleteCommentApi } from "../../services/apiComments";

export const useDeleteComment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteCommentApi(id),
    onSuccess: () => {
      toast.success("Коментар успішно видалено!");
      queryClient.invalidateQueries("adminComments");
      queryClient.invalidateQueries("articles");
      queryClient.invalidateQueries("article");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  return {
    deleteComment: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
