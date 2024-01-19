import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loader from "../components/common/Loader/Loader";
import ProductBox from "../components/ProductBox/ProductBox";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import MainLayout from "../components/MainLayout/MainLayout";

const OneProductPage = () => {
  const { slug } = useParams();

  const { products, isLoading, error } = useProducts(`slug=${slug}`);
  return (
    <>
      <Header />
      {isLoading ? (
        <MainLayout
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Loader type={"global"} />
        </MainLayout>
      ) : error ? (
        <MainLayout
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ErrorMassage status={error.status} />
        </MainLayout>
      ) : (
        <MainLayout>
          <ProductBox product={products?.[1]?.[0]} />
        </MainLayout>
      )}

      <Footer />
    </>
  );
};

export default OneProductPage;
