import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loader from "../components/common/Loader/Loader";
import ProductBox from "../components/ProductBox/ProductBox";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import MainLayout from "../components/MainLayout/MainLayout";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import Modal from "../components/common/Modal/Modal";
import Title from "../components/common/Title/Title";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import Picture from "../components/common/Picture/Picture";
import loginImg from "../assets/login.svg";
import Gallery from "../components/Gallery/Gallery";
import BlockHeader from "../components/common/BlockHeader/BlockHeader";
import Product from "../components/Product/Product";

const OneProductPage = () => {
  const { slug } = useParams();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { products, isLoading, error } = useProducts(`slug=${slug}`);

  const {
    products: categoryProducts,
    error: categoryError,
    isLoading: categoryLoading,
  } = useProducts(`category=${products?.[1]?.[0]?.category}&sort=-avgRating`);
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
          <ProductBox
            product={products?.[1]?.[0]}
            isSaved={user ? user.savedProducts.includes(products?.[1]?.[0]?.id) : false}
            onUserError={() => setIsModalOpen(true)}
          />

          <Gallery
            isLoading={categoryLoading}
            error={categoryError}
            top={<BlockHeader title={"Схожі страви"} />}
            items={categoryProducts?.[1]?.map((item) => (
              <Product
                product={item}
                key={item?.id}
                isSaved={user?.savedProducts?.includes(item?.id)}
                onUserError={() => setIsModalOpen(true)}
              />
            ))}
          />
        </MainLayout>
      )}

      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <Title type={"small"} align={"center"}>
            Увійдіть в свій аккаунт!
          </Title>
          <Text align={"center"}>
            Додавати товар в улюблені можуть лише зареєстровані користувачі сайту
          </Text>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <Button asTag={"Link"} to={"/login"}>
              Вхід {<Picture alt={"login"} formats={{ jpg: loginImg }} />}
            </Button>
            <Button asTag={"Link"} to={"/signup"} type={"outline-red"}>
              Реєстрація
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OneProductPage;
