import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useUser } from "../hooks/useUser";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import ProductBox from "../components/layout/ProductBox/ProductBox";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Modal from "../components/block/Modal/Modal";
import Title from "../components/common/Title/Title";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import Picture from "../components/common/Picture/Picture";
import loginImg from "../assets/login.svg";
import Gallery from "../components/layout/Gallery/Gallery";
import BlockHeader from "../components/layout/BlockHeader/BlockHeader";
import Product from "../components/block/Product/Product";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import BtnBlock from "../components/layout/BtnBlock/BtnBlock";

const OneProductPage = () => {
  const { slug } = useParams();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();

  const { products, isLoading, error } = useProducts(`slug=${slug}`);

  const {
    products: categoryProducts,
    error: categoryError,
    isLoading: categoryLoading,
  } = useProducts(`category=${products?.[1]?.[0]?.category}&sort=-avgRating`);
  return (
    <>
      <Header />

      {isLoading && (
        <MainLayout>
          <PageLoader />
        </MainLayout>
      )}

      {error && (
        <MainLayout>
          <ErrorMassage status={error.status} />
        </MainLayout>
      )}

      {!isLoading && !error && products && (
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} align="center">
        <Title type={"small"} align={"center"}>
          Увійдіть в свій аккаунт!
        </Title>
        <Text align={"center"}>
          Додавати товар в улюблені можуть лише зареєстровані користувачі сайту
        </Text>
        <BtnBlock>
          <Button asTag={"Link"} to={`/login?next=${pathname}`}>
            Вхід {<Picture alt={"login"} formats={{ jpg: loginImg }} />}
          </Button>
          <Button asTag={"Link"} to={`/signup?next=${pathname}`} type={"outline-red"}>
            Реєстрація
          </Button>
        </BtnBlock>
      </Modal>
    </>
  );
};

export default OneProductPage;
