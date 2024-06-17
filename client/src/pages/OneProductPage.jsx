import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import ProductBox from "../components/layout/ProductBox/ProductBox";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import { useParams } from "react-router-dom";

const OneProductPage = () => {
  const { slug } = useParams();

  return (
    <>
      <Header />

      <MainLayout>
        <ProductBox slug={slug} />
      </MainLayout>

      <Footer />
    </>
  );
};

export default OneProductPage;
