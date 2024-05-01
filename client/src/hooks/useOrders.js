import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/apiOrders";

export const useOrders = (query) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getOrders(query),
    queryKey: ["orders", query],
    staleTime: 0,
  });

  return { orders: data, isLoading: isLoading, error: error };
};
