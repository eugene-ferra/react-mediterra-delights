import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import PageError from "../components/layout/PageError/PageError";
import forbiddenImg from "../assets/forbidden.png";

const ForbiddenPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <PageError
          pic={forbiddenImg}
          title={"Схоже, ви не маєте доступу до цієї сторінки!"}
          to={"/"}
          linkText={"На головну"}
          alt={"403"}
        />
      </MainLayout>
    </>
  );
};

export default ForbiddenPage;
