import { useQuery } from "@tanstack/react-query";
import { getSavedArticles } from "../../../services/apiUsers";

export const useSavedArticles = (user, page = 1) => {
  const articles = useQuery({
    queryFn: () => getSavedArticles(page),
    queryKey: ["savedArticles", [...user.savedArticles], page],
    staleTime: 0,
  });

  return {
    articles: articles.data || [],
    isArticlesLoading: articles.isLoading,
    isArticlesError: articles.isError,
    articlesError: articles.error,
  };
};
