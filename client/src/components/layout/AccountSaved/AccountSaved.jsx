import { useUser } from "../../../hooks/useUser";
import Article from "../../block/Article/Article";
import Catalog from "../Catalog/Catalog";
import Button from "../../common/Button/Button";
import PageLoader from "../../layout/PageLoader/PageLoader";
import Title from "../../common/Title/Title";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../block/Pagination/Pagination";
import { useSavedArticles } from "./useSavedArticles";

const AccountSaved = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const { articles, isArticlesLoading } = useSavedArticles(
    user,
    searchParams.get("page") || 1
  );

  return (
    <>
      <Title>Ваші збережені статті:</Title>

      {isArticlesLoading && <PageLoader />}

      {!isArticlesLoading && articles && (
        <>
          <Catalog type={"small"}>
            {articles?.data?.map((item) => (
              <Article article={item} key={item?.id} />
            ))}
          </Catalog>
          <Pagination
            totalCount={articles?.pages}
            siblingCount={2}
            currPage={searchParams.get("page") || 1}
            onLink={setSearchParams}
          />
        </>
      )}

      {!isArticlesLoading && articles?.data?.length == 0 && (
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
