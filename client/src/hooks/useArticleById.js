import { useQuery } from "@tanstack/react-query";
import { getOneArticle } from "../services/apiArticles";

export const useArticleById = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getOneArticle(id),
  });

  return {
    article: data || null,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
