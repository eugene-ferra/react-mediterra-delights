import { useQueries } from "@tanstack/react-query";

export const useBlobs = (pathArr = [], key) => {
  const queries = useQueries({
    queries: pathArr?.map((path, i) => {
      return {
        queryKey: [...key, i],
        queryFn: async () => await fetch(path).then((res) => res.blob()),
        retry: 2,
      };
    }),
  });

  let pictures = [];

  if (queries.every((item) => item.isSuccess)) {
    pictures = queries.map((query, i) => {
      if (!query.data.type.startsWith("image")) {
        for (let i = 0; i < 3; i++) {
          query.refetch({});
        }
      }
      let data = query.data;
      data["name"] = pathArr[i];
      data["path"] = pathArr[i];
      data["preview"] = pathArr[i];
      return data;
    });
  }

  return {
    pictures: pictures,
  };
};
