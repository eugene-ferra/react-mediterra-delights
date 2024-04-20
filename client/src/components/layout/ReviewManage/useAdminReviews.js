import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../../services/apiReviews";

export const useAdminReviews = (page) => {
  const query = useQuery({
    queryFn: () => getReviews(`isModerated=false&page=${page}`),
    queryKey: ["adminReviews", page],
    staleTime: 0,
  });

  return {
    reviews: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
