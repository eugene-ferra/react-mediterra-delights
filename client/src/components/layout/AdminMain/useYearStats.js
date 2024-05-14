import { useQuery } from "@tanstack/react-query";
import { getStatsByYear } from "../../../services/apiOrders";

export const useYearStats = (year) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orderStats", year],
    queryFn: () => getStatsByYear(year),
  });

  return {
    stats: data || null,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
