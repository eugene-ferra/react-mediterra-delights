import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/apiComments";

export const useAdminComments = (page) => {
  const query = useQuery({
    queryFn: () => getComments(`isModerated=false&page=${page}`),
    queryKey: ["adminComments", page],
    staleTime: 0,
  });

  return {
    comments: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
