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

const ProductsPage = () => {
  const { options, isLoading, error } = useProductsOptions();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    isLoading: isProductsLoading,
    error: productError,
  } = useProducts(searchParams.toString());

  return (
    <>
      <Header />
      <MainLayout>
        <Container>
          <Title type={"global"}>Меню</Title>
          <Filters
            filters={options?.categories}
            currentFilter={searchParams?.get("category") || options?.categories[0]}
            onFilter={setSearchParams}
            filterQuery={"category"}
          />

          {isProductsLoading ? (
            <Loader type={"global"} />
          ) : productError ? (
            <ErrorMassage status={productError?.status} />
          ) : (
            <>
              <Catalog>
                {products?.[1].map((product) => (
                  <Product product={product} key={product?.id} />
                ))}
              </Catalog>
              <Pagination
                totalCount={products?.[0].pages}
                siblingCount={2}
                currPage={1}
              />
            </>
          )}
        </Container>
      </MainLayout>
      <Footer />
    </>
  );
};

export default ProductsPage;
