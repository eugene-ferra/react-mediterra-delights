import { useUser } from "../../../hooks/useUser";
import { useManyArticlesByIds } from "../../../hooks/useManyArticlesByIds";
import Article from "../../block/Article/Article";
import Catalog from "../Catalog/Catalog";
import Button from "../../common/Button/Button";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import PageLoader from "../../layout/PageLoader/PageLoader";
import Title from "../../common/Title/Title";

const AccountSaved = () => {
  const { user } = useUser();
  const { articles, isLoading, error } = useManyArticlesByIds(user?.savedArticles);

  return (
    <>
      <Title>Ваші збережені статті:</Title>

      {error && <ErrorMassage status={error?.[0]} />}

      {isLoading && <PageLoader />}

      {!isLoading && articles?.[1] && (
        <Catalog type={"small"}>
          {articles?.[1]?.map((item) => (
            <Article article={item} key={item?.id} />
          ))}
        </Catalog>
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
