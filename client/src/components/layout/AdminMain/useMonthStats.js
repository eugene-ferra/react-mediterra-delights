import { useQuery } from "@tanstack/react-query";
import { getStatsByMonth } from "../../../services/apiOrders";

export const useMonthStats = (year, month) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orderStats", year, month],
    queryFn: () => getStatsByMonth(year, month),
  });

  return {
    stats: data || null,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
