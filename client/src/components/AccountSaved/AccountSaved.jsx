import { useUser } from "../../hooks/useUser";
import Article from "../Article/Article";
import Catalog from "../Catalog/Catalog";
import Button from "../common/Button/Button";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import Loader from "../common/Loader/Loader";
import Title from "../common/Title/Title";
import { useSavedArticles } from "./useSavedArticles";

const AccountSaved = () => {
  const { user } = useUser();

  const { articles, isLoading, error } = useSavedArticles(user?.savedArticles);

  return (
    <>
      <Title>Ваші збережені статті:</Title>
      {error?.[0] != null ? (
        <ErrorMassage status={error?.[0]} />
      ) : isLoading ? (
        <Loader type={"global"} />
      ) : articles?.length > 0 ? (
        <Catalog type={"small"}>
          {articles?.map((item) => (
            <Article article={item} key={item?.id} />
          ))}
        </Catalog>
      ) : (
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
