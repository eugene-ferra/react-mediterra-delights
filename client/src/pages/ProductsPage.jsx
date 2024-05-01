import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useProducts } from "../hooks/useProducts";
import { useProductsOptions } from "../hooks/useProductOptions";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Container from "../components/layout/Container/Container";
import Product from "../components/block/Product/Product";
import Catalog from "../components/layout/Catalog/Catalog";
import Pagination from "../components/block/Pagination/Pagination";
import Title from "../components/common/Title/Title";
import Filters from "../components/layout/Filters/Filters";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import Loader from "../components/common/Loader/Loader";
import Modal from "../components/block/Modal/Modal";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import Picture from "../components/common/Picture/Picture";
import loginImg from "../assets/login.svg";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import BtnBlock from "../components/layout/BtnBlock/BtnBlock";

const ProductsPage = () => {
  const { options, isLoading, error } = useProductsOptions();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    isLoading: isProductsLoading,
    error: productError,
  } = useProducts(searchParams.toString());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useUser();

  const { pathname } = useLocation();

  const onClose = () => setIsModalOpen(false);

  return (
    <>
      <Header />

      {isLoading && (
        <MainLayout>
          <PageLoader />
        </MainLayout>
      )}

      {!isLoading && (
        <MainLayout>
          <Container>
            <Title type={"global"}>Меню</Title>
            {!error && options && (
              <Filters
                filters={[
                  {
                    title: "Всі страви",
                    filter: () => setSearchParams({}),
                  },
                ].concat(
                  options?.categories?.map((item) => ({
                    title: item,
                    filter: () => setSearchParams({ category: item }),
                  }))
                )}
                initialFilter={{
                  title: "Всі страви",
                }}
              />
            )}

            {isProductsLoading && (
              <Catalog type={"no-items"}>
                <Loader type={"global"} />
              </Catalog>
            )}
            {productError && (
              <Catalog type={"no-items"}>
                <ErrorMassage status={productError?.status} />
              </Catalog>
            )}

            {products && (
              <>
                <Catalog>
                  {products?.[1].map((product) => (
                    <Product
                      product={product}
                      key={product?.id}
                      isSaved={user ? user.savedProducts.includes(product.id) : false}
                      onUserError={() => setIsModalOpen(true)}
                    />
                  ))}
                </Catalog>
                <Pagination
                  totalCount={products?.[0].pages}
                  siblingCount={2}
                  currPage={searchParams.get("page") || 1}
                  onLink={setSearchParams}
                />
              </>
            )}
          </Container>
        </MainLayout>
      )}

      <Footer />

      <Modal isOpen={isModalOpen} onClose={onClose} align="center">
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

export default ProductsPage;
