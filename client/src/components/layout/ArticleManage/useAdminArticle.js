import { useQuery } from "@tanstack/react-query";
import { getOneArticle } from "../../../services/apiArticles";
import { useBlobs } from "../../../hooks/useBlobs";
import { useEffect } from "react";

export const useAdminArticle = (id, setValue) => {
  const {
    data: article,
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["adminArticle", id],
    queryFn: () => getOneArticle(id),
    staleTime: 0,
  });

  const { pictures: imgCover } = useBlobs(
    [article?.imgCover?.jpg],
    ["adminArticle", "imgCover", id]
  );

  useEffect(() => {
    if (!isFetching && isSuccess && article) {
      setValue("title", article.title);
      setValue("topic", article.topic);
      setValue("imgCover", imgCover);
      setValue("previewText", article.previewText);
      setValue("markup", article.markup);
    }
  }, [isFetching, isSuccess, article, imgCover, setValue]);

  return {
    article: article || null,
    imgCover: imgCover,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
