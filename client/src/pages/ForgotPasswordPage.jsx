import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import ForgotPasswordBlock from "../components/layout/ForgotPasswordBlock/ForgotPasswordBlock";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
  useEffect(() => {
    document.title = "Забули пароль?";
  }, []);

  return (
    <>
      <Header />
      <ForgotPasswordBlock />
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
