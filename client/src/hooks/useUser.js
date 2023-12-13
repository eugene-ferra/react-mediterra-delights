import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/apiUsers";

export const useUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });

  return {
    user: data || error,
    isLoading: isLoading,
  };
};
