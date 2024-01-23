import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MainLayout from "../components/MainLayout/MainLayout";
import Container from "../components/common/Container/Container";
import Product from "../components/Product/Product";
import { useProducts } from "../hooks/useProducts";
import Catalog from "../components/Catalog/Catalog";
import Pagination from "../components/common/Pagination/Pagination";
import Title from "../components/common/Title/Title";
import Filters from "../components/common/Filters/Filters";
import { useProductsOptions } from "../hooks/useProductOptions";
import { useSearchParams } from "react-router-dom";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import Loader from "../components/common/Loader/Loader";
import { useUser } from "../hooks/useUser";
import Modal from "../components/common/Modal/Modal";
import { useState } from "react";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import Picture from "../components/common/Picture/Picture";
import loginImg from "../assets/login.svg";

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

  return (
    <>
      <Header />
      {isLoading ? (
        <MainLayout
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Loader type={"global"} />
        </MainLayout>
      ) : (
        <MainLayout>
          <Container>
            <Title type={"global"}>Меню</Title>
            {!error && (
              <Filters
                resetFilter={"Всі страви"}
                filters={options?.categories}
                currentFilter={searchParams?.get("category")}
                onFilter={setSearchParams}
                filterQuery={"category"}
              />
            )}
            {isProductsLoading ? (
              <div style={{ marginTop: "40px" }}>
                <Loader type={"global"} />
              </div>
            ) : productError ? (
              <div style={{ marginTop: "40px" }}>
                <ErrorMassage status={productError?.status} />
              </div>
            ) : (
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

export default ProductsPage;
