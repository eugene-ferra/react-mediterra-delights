import { useQueries } from "@tanstack/react-query";

export const useBlobs = (pathArr = [], key) => {
  const queries = useQueries({
    queries: pathArr?.map((path, i) => {
      return {
        queryKey: [...key, i],
        queryFn: async () => await fetch(path).then((res) => res.blob()),
      };
    }),
  });

  let pictures = [];

  if (queries.every((item) => item.isSuccess)) {
    pictures = queries.map((query, i) => {
      if (!query.data.type.startsWith("image")) query.refetch();
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
