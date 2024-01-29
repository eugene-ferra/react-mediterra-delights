import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MainLayout from "../components/MainLayout/MainLayout";
import Promo from "../components/Promo/Promo";
import AboutBlock from "../components/AboutBlock/AboutBlock";

const HomePage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <Promo />
        <AboutBlock />
      </MainLayout>
      <Footer />
    </>
  );
};

export default HomePage;
