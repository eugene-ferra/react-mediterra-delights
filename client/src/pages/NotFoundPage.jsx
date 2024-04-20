import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Picture from "../components/common/Picture/Picture";
import Title from "../components/common/Title/Title";
import notFoundPic from "../assets/notFound.png";
import Button from "../components/common/Button/Button";
import PageError from "../components/layout/PageError/PageError";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <PageError
          title={"Схоже, такої сторінки не існує!"}
          linkText={"На головну"}
          to={"/"}
          alt={"404"}
          pic={notFoundPic}
        />
      </MainLayout>
      <Footer />
    </>
  );
};

export default NotFoundPage;
