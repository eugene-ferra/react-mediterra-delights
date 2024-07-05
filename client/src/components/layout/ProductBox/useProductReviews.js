import { useQuery } from "@tanstack/react-query";
import { getProductsReviews } from "../../../services/apiProducts";

export const useProductReviews = (id, page = 1, limit = 5) => {
  const query = useQuery({
    queryFn: () => getProductsReviews(id, page, limit),
    queryKey: ["product", id, "reviews", page, limit],
    staleTime: 10 * 60 * 1000,
    enabled: id != null,
  });

  return {
    reviews: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
