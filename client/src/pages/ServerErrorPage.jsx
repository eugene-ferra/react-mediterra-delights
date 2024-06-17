import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import serverErrorPic from "../assets/serverError.png";
import PageError from "../components/layout/PageError/PageError";
import { useEffect } from "react";

const ServerErrorPage = () => {
  useEffect(() => {
    document.title = "500";
  }, []);

  return (
    <>
      <Header />
      <MainLayout>
        <PageError
          title={"Сталася помилка... Ми вже працюємо над її вирішенням"}
          pic={serverErrorPic}
          alt={"500"}
        />
      </MainLayout>
      <Footer />
    </>
  );
};

export default ServerErrorPage;
