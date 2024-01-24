import { useQueries } from "@tanstack/react-query";
import { getOneArticle } from "../../services/apiArticles";

export const useSavedArticles = (ids) => {
  const results = useQueries({
    queries: ids?.map((id) => ({
      queryKey: ["article", id],
      queryFn: () => getOneArticle(id),
      staleTime: 0,
    })),
  });

  return {
    articles: results.map((result) => result.data),
    isLoading: results.some((result) => result.isPending),
    error: results.map((result) => result.error),
  };
};
