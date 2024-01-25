import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Ви успішно вийшли з аккаунту!");
      queryClient.clear("user");
      navigate("/");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
    },
  });

  return {
    logout: mutate,
    isLoading: isLoading,
  };
};
