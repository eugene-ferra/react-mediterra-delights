import SignUpForm from "../components/layout/SignUpForm/SignUpForm";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { useEffect } from "react";

const SignUpPage = () => {
  useEffect(() => {
    document.title = "Реєстрація";
  }, []);

  return (
    <>
      <Header />
      <SignUpForm />
      <Footer />
    </>
  );
};

export default SignUpPage;
