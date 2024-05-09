import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services/apiReviews";

export const useReviews = (queryStr) => {
  const query = useQuery({
    queryFn: () => getReviews(queryStr),
    queryKey: ["reviews", queryStr],
    staleTime: 0,
  });

  return {
    reviews: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
