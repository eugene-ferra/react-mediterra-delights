import { Link, useSearchParams } from "react-router-dom";
import { useArticles } from "./useArticles";
import ManageItem from "../ManageItem/ManageItem";
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";
import Pagination from "../../block/Pagination/Pagination";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import EditIcon from "../../svg/EditIcon";

const ArticleManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { articles, isError, error, isLoading } = useArticles(searchParams.toString());

  return (
    <>
      <Title>Додані статті:</Title>

      <ManageItem
        isLoading={isLoading}
        isError={isError}
        error={<ErrorMassage status={error?.status} />}
        columns={["", "Назва", "Тема", "Лайки", "Перегляди", "Дата створення"]}
        rowsData={articles?.[1]?.map((item) => [
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
          totalCount={articles?.[0]?.pages}
          siblingCount={2}
          currPage={searchParams.get("page")}
          onLink={setSearchParams}
        />
      </ManageItem>

      <Button asTag={"Link"} to={"new"}>
        Створити
      </Button>
    </>
  );
};

export default ArticleManage;
