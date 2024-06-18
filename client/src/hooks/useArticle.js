import { useQuery } from "@tanstack/react-query";
import { getOneArticle } from "../services/apiArticles";

export const useArticle = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getOneArticle(id),
    staleTime: 0,
    enabled: id != null,
  });

  return {
    article: data || null,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
