import { forgotPassword } from "../../../services/apiUsers";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => forgotPassword(data),
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Запит на відновлення пароля успішно надіслано!");
      navigate(new URLSearchParams(location.search).get("next") || "/");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
      setErrors(errObj?.errors);
    },
  });

  return {
    forgotPassword: mutate,
    isLoading: isPending,
    errors,
  };
};
