import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../services/apiArticles";

export const useArticles = (urlQuery) => {
  const query = useQuery({
    queryFn: () => getArticles(urlQuery),
    queryKey: ["adminArticles", urlQuery],
    staleTime: 10 * 60 * 1000,
  });

  return {
    articles: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
