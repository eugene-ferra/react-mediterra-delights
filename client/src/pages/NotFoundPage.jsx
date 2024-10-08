import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import notFoundPic from "../assets/notFound.png";
import PageError from "../components/layout/PageError/PageError";
import { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404";
  }, []);

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
