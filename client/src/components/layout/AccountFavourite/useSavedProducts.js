import { useQuery } from "@tanstack/react-query";
import { getSavedProducts } from "../../../services/apiUsers";

export const useSavedProducts = (user, page = 1) => {
  const products = useQuery({
    queryFn: () => getSavedProducts(page),
    queryKey: ["savedProducts", [...user.savedProducts], page],
    staleTime: 0,
  });

  return {
    products: products.data || [],
    isProductsLoading: products.isLoading,
    isProductsError: products.isError,
    productsError: products.error,
  };
};
