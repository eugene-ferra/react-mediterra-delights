import { useUser } from "../../../hooks/useUser";
import { useManyArticlesByIds } from "../../../hooks/useManyArticlesByIds";
import Article from "../../block/Article/Article";
import Catalog from "../Catalog/Catalog";
import Button from "../../common/Button/Button";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import PageLoader from "../../layout/PageLoader/PageLoader";
import Title from "../../common/Title/Title";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../block/Pagination/Pagination";

const AccountSaved = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const { articles, isLoading, error } = useManyArticlesByIds(
    user?.savedArticles,
    searchParams.get("page") || 1
  );

  return (
    <>
      <Title>Ваші збережені статті:</Title>

      {error && <ErrorMassage status={error?.[0]} />}

      {isLoading && <PageLoader />}

      {!isLoading && articles?.[1] && (
        <>
          <Catalog type={"small"}>
            {articles?.[1]?.map((item) => (
              <Article article={item} key={item?.id} />
            ))}
          </Catalog>
          <Pagination
            totalCount={articles?.[0]?.pages}
            siblingCount={2}
            currPage={searchParams.get("page") || 1}
            onLink={setSearchParams}
          />
        </>
      )}

      {articles?.length == 0 && (
        <>
          <Title type={"small"}>Ви ще не зберегли жодної статті</Title>
          <Button asTag={"Link"} to={"/articles"}>
            Перейти до статей
          </Button>
        </>
      )}
    </>
  );
};

export default AccountSaved;
