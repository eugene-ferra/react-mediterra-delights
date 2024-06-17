import { useEffect } from "react";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import ResetPasswordBlock from "../components/layout/ResetPasswordBlock/ResetPasswordBlock";

const ResetPasswordPage = () => {
  useEffect(() => {
    document.title = "Скидання пароля";
  }, []);

  return (
    <>
      <Header />
      <ResetPasswordBlock />
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
