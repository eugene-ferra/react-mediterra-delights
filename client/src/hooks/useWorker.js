import { useQuery } from "@tanstack/react-query";
import { getWorker } from "../services/apiWorkers";

export const useWorker = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["worker", id],
    queryFn: () => getWorker(id),
  });

  return {
    worker: data || null,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
