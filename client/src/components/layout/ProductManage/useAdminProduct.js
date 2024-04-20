import { useQuery } from "@tanstack/react-query";
import { getOneProduct } from "../../../services/apiProducts";
import { useBlobs } from "../../../hooks/useBlobs";
import { useEffect } from "react";

export const useAdminProduct = (id, setValue) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["adminProduct", id],
    queryFn: () => getOneProduct(id),
    staleTime: 0,
  });

  const { pictures: imgCover } = useBlobs(
    [product?.imgCover?.jpg],
    ["adminProduct", "imgCover", id]
  );
  const { pictures } = useBlobs(
    product?.images?.map((item) => item.jpg),
    ["adminProduct", "images", id]
  );

  useEffect(() => {
    if (!isFetching && isSuccess && product) {
      setValue("title", product.title);
      setValue("category", product.category);
      setValue("imgCover", imgCover);
      setValue("images", pictures);
      setValue("description", product.description);
      setValue("fullText", product.fullText);
      setValue("price", product.price);
      setValue("discountPrice", product.discountPrice);
      setValue("weight", product.weight);
      setValue("cookTime", product.cookTime);
      setValue("nutrients.calories", product.nutrients?.calories);
      setValue("nutrients.carbohydrates", product.nutrients?.carbohydrates);
      setValue("nutrients.protein", product.nutrients.protein);
      setValue("nutrients.fats", product.nutrients.fats);
      setValue("isVegan", product.isVegan);
      setValue("isNewProduct", product.isNewProduct);
    }
  }, [isFetching, isSuccess, product, imgCover, pictures, setValue]);

  return {
    product: product || null,
    imgCover: imgCover,
    pictures: pictures || [],
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
