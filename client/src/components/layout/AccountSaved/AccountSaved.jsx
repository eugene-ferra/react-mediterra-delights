import { useUser } from "../../../hooks/useUser";
import { useSavedArticles } from "./useSavedArticles";
import Article from "../../block/Article/Article";
import Catalog from "../Catalog/Catalog";
import Button from "../../common/Button/Button";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import Loader from "../../common/Loader/Loader";
import Title from "../../common/Title/Title";

const AccountSaved = () => {
  const { user } = useUser();
  const { articles, isLoading, error } = useSavedArticles(user?.savedArticles);

  console.log(articles);

  return (
    <>
      <Title>Ваші збережені статті:</Title>

      {error && <ErrorMassage status={error?.[0]} />}

      {isLoading && <Loader type={"global"} />}

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
