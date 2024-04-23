import { useQuery } from "@tanstack/react-query";
import { getOneOrder } from "../services/apiOrders";

export const useOrder = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOneOrder(id),
  });

  return {
    order: data || null,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
