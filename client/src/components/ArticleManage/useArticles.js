import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../services/apiArticles";

export const useArticles = (page) => {
  const query = useQuery({
    queryFn: () => getArticles(page),
    queryKey: ["adminArticles", page],
    staleTime: 10 * 60 * 1000,
  });

  return {
    articles: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
