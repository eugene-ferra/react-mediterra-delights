import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateMe } from "../../services/apiUsers";

export const useUpdateUser = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => updateMe(data),
    onSuccess: () => {
      toast.success("Персональну інформацію успішно оновлено!");
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("product");
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("article");
      queryClient.invalidateQueries("articles");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isPending,
    errors: errors,
  };
};
