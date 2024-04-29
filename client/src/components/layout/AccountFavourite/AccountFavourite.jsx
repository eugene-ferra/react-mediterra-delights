import { useUser } from "../../../hooks/useUser";
import { useManyProductsByIds } from "../../../hooks/useManyProductsByIds";
import Title from "../../common/Title/Title";
import Catalog from "../Catalog/Catalog";
import Product from "../../block/Product/Product";
import Button from "../../common/Button/Button";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import PageLoader from "../PageLoader/PageLoader";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../block/Pagination/Pagination";

const AccountFavourite = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const { products, isLoading, error } = useManyProductsByIds(
    user?.savedProducts,
    searchParams.get("page") || 1
  );

  return (
    <>
      <Title>Ваші улюблені страви:</Title>

      {error && <ErrorMassage status={error.status} />}

      {isLoading && <PageLoader />}

      {!isLoading && products?.[1] && (
        <>
          <Catalog type="small">
            {products?.[1].map((item) => (
              <Product
                product={item}
                key={item?.id}
                isSaved={user?.savedProducts?.includes(item?.id)}
              />
            ))}
          </Catalog>
          <Pagination
            totalCount={products?.[0]?.pages}
            siblingCount={2}
            currPage={searchParams.get("page") || 1}
            onLink={setSearchParams}
          />
        </>
      )}
      {products?.length == 0 && (
        <>
          <Title type="small">Ви ще не додали жодного товару в улюблені</Title>
          <Button asTag="Link" to="/products">
            Перейти до меню
          </Button>
        </>
      )}
    </>
  );
};

export default AccountFavourite;
