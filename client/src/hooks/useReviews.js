import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services/apiReviews";

export const useReviews = (queryStr) => {
  const query = useQuery({
    queryFn: () => getReviews(queryStr),
    queryKey: ["reviews", queryStr],
    staleTime: 10 * 60 * 1000,
    enabled: queryStr != null,
  });

  return {
    reviews: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
