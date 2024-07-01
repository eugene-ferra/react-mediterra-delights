import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useArticles } from "../../../hooks/useArticles";
import ManageItem from "../ManageItem/ManageItem";
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";
import Pagination from "../../block/Pagination/Pagination";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import EditIcon from "../../svg/EditIcon";
import SearchInput from "../SearchInput/SearchInput";

const ArticleManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [searchPage, setSearchPage] = useState({ page: 1 });

  const { articles, isError, error, isLoading } = useArticles(
    searchValue
      ? `title[regex]=${searchValue}&page=${searchPage.page}&limit=3`
      : searchParams.toString()
  );

  return (
    <>
      <Title>Додані статті:</Title>

      <SearchInput
        setValue={setSearchValue}
        value={searchValue}
        inputTitle={"Пошук cтатті"}
        resetFn={() => setSearchPage({ page: 1 })}
      />

      <ManageItem
        isLoading={isLoading}
        isError={isError}
        error={<ErrorMassage status={error?.status} />}
        columns={["", "Назва", "Тема", "Лайки", "Перегляди", "Дата створення"]}
        rowsData={articles?.data?.map((item) => [
          <Link to={`${item.id}`} key={item.id}>
            <EditIcon />
          </Link>,
          <Link to={`${item.id}`} key={item.id} style={{ textAlign: "left" }}>
            {item?.title}
          </Link>,
          <Link to={`${item.id}`} key={item.id}>
            {item?.topic}
          </Link>,
          <Link to={`${item.id}`} key={item.id}>
            {item?.likes}
          </Link>,
          <Link to={`${item.id}`} key={item.id}>
            {item?.views}
          </Link>,
          <Link to={`${item.id}`} key={item.id}>
            {new Date(item.createdAt).toLocaleString()}
          </Link>,
        ])}
      >
        <Pagination
          totalCount={articles?.pages}
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

export default ArticleManage;
