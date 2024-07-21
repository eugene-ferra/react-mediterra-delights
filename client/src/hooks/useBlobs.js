import { useQueries } from "@tanstack/react-query";

export const useBlobs = (pathArr = [], key) => {
  const queries = useQueries({
    queries: pathArr?.map((path, i) => {
      let retryCount = 0; // Track the number of retries

      return {
        queryKey: [...key, i],
        queryFn: async () => {
          try {
            const res = await fetch(path);
            if (!res.ok) {
              throw new Error("Failed to fetch blob");
            }
            return await res.blob();
          } catch (error) {
            retryCount++; // Increment the retry count
            if (retryCount >= 3) {
              throw error; // Throw the error to stop the query
            }
            return new Blob({}); // Return an empty blob in case of error
          }
        },
        retry: 2,
      };
    }),
  });

  let pictures = [];

  if (queries.every((query) => !query.isLoading)) {
    pictures = queries.map((query, i) => {
      if (query.isLoading && !query?.data?.type.startsWith("image")) {
        for (let i = 0; i < 3; i++) {
          query.refetch({});
        }
        return {
          name: null,
          path: null,
          preview: null,
        };
      }

      if (query.isSuccess) {
        return {
          name: pathArr[i],
          path: pathArr[i],
          preview: pathArr[i],
        };
      }
    });
  }

  return {
    pictures: pictures,
  };
};
