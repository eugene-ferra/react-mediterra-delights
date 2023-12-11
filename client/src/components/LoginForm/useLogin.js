import { login as apiLogin } from "../../services/apiUsers";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => apiLogin(data),
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(new URLSearchParams(location.search).get("next") || "/");
    },
    onError: (errObj) => {
      if (errObj.status === 500) navigate("/500");
      setErrors(errObj);
    },
  });

  return {
    login: mutate,
    isLoading: isPending,
    errors,
  };
};
