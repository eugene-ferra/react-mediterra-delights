import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/apiOrders";

export const useManyOrdersByIds = (ids, page = 1) => {
  let queryStr = ids?.length ? ids.map((id) => `_id[in]=${id}`).join("&") : false;

  const result = useQuery({
    queryKey: ["orders", [...ids], page],
    queryFn:
      ids?.length == 0 ? () => [] : () => getOrders(`${queryStr}&page=${page}&limit=5`),
    staleTime: 0,
  });

  return {
    orders: result.data,
    isLoading: result.isPending,
    error: result.error,
  };
};
