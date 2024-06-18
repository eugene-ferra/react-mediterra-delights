import { useQuery } from "@tanstack/react-query";
import { getOrdersHistory } from "../../../services/apiUsers";

export const useOrderHistory = (user, page = 1) => {
  const orders = useQuery({
    queryFn: () => getOrdersHistory(page),
    queryKey: ["orderHistory", [...user.orders], page],
    staleTime: 0,
  });

  return {
    orders: orders.data || [],
    isOrdersLoading: orders.isLoading,
    isOrdersError: orders.isError,
    ordersError: orders.error,
  };
};
