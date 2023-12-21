import { useState } from "react";
import ManageItem from "../ManageItem/ManageItem";
import Button from "../common/Button/Button";
import Title from "../common/Title/Title";
import { useProducts } from "./useProducts";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";

const ProductManage = () => {
  const [page, setPage] = useState(1);
  const { products, isError, error, isLoading } = useProducts(page);
  console.log(error);

  return (
    <>
      <Title>Додані товари:</Title>
      <Button asTag={"Link"} to={"new"}>
        Створити
      </Button>

      <ManageItem
        isLoading={isLoading}
        isError={isError}
        error={<ErrorMassage status={error?.status} />}
        columns={["Назва", "Категорія", "Ціна", "Зі знижкою", "Вага", "Рейтинг"]}
        rowsData={products?.map((item) => [
          item.title,
          item.category,
          item.price,
          item.discountPrice || "-",
          item.weight,
          item.avgRating,
        ])}
      />
    </>
  );
};

export default ProductManage;
