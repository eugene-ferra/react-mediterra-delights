import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "../../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      toast.success("Аккаунт успішно видалено!");
      queryClient.clear("user");
      queryClient.invalidateQueries("product");
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("article");
      queryClient.invalidateQueries("articles");
      navigate("/");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  return {
    deleteMe: mutate,
    isLoading: isLoading,
  };
};
