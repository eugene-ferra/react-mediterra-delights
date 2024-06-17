import LoginForm from "../components/layout/LoginForm/LoginForm";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Вхід";
  }, []);

  return (
    <>
      <Header />
      <LoginForm />
      <Footer />
    </>
  );
};

export default LoginPage;
