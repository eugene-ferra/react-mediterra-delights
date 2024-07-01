import { useProducts } from "../../../hooks/useProducts";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ManageItem from "../ManageItem/ManageItem";
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import EditIcon from "../../svg/EditIcon";
import Pagination from "../../block/Pagination/Pagination";
import SearchInput from "../SearchInput/SearchInput";

const ProductManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [searchPage, setSearchPage] = useState({ page: 1 });

  const { products, isError, error, isLoading } = useProducts(
    searchValue
      ? `title[regex]=${searchValue}&page=${searchPage.page}`
      : searchParams.toString()
  );

  return (
    <>
      <Title>Додані товари:</Title>

      <SearchInput
        setValue={setSearchValue}
        value={searchValue}
        inputTitle={"Пошук продукту"}
        resetFn={() => setSearchPage({ page: 1 })}
      />

      <ManageItem
        isLoading={isLoading}
        isError={isError}
        error={<ErrorMassage status={error?.status} />}
        columns={["", "Назва", "Категорія", "Ціна", "Зі знижкою", "Вага", "Рейтинг"]}
        rowsData={products?.data?.map((item) => [
          <Link to={`${item.id}`} key={item.id}>
            <EditIcon />
          </Link>,
          <Link to={`${item.id}`} key={item.title} style={{ textAlign: "left" }}>
            {item.title}
          </Link>,
          <Link to={`${item.id}`} key={item.category}>
            {item.category}
          </Link>,
          <Link to={`${item.id}`} key={item.price}>
            {item.price}
          </Link>,
          <Link to={`${item.id}`} key={item.discountPrice || "-"}>
            {item.discountPrice || "-"}
          </Link>,
          <Link to={`${item.id}`} key={item.weight}>
            {item.weight}
          </Link>,
          <Link to={`${item.id}`} key={item.avgRating}>
            {item.avgRating?.toFixed(2)}
          </Link>,
        ])}
      >
        <Pagination
          totalCount={products?.pages}
          siblingCount={2}
          currPage={searchValue ? searchPage.page : searchParams.get("page")}
          onLink={searchValue ? setSearchPage : setSearchParams}
        />
      </ManageItem>

      <Button asTag={"Link"} to={"new"}>
        Створити
      </Button>
    </>
  );
};

export default ProductManage;
