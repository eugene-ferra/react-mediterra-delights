import { useUser } from "../../../hooks/useUser";
import { useManyProductsByIds } from "../../../hooks/useManyProductsByIds";
import Title from "../../common/Title/Title";
import Catalog from "../Catalog/Catalog";
import Product from "../../block/Product/Product";
import Button from "../../common/Button/Button";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import PageLoader from "../PageLoader/PageLoader";

const AccountFavourite = () => {
  const { user } = useUser();
  const { products, isLoading, error } = useManyProductsByIds(user?.savedProducts);

  return (
    <>
      <Title>Ваші улюблені страви:</Title>

      {error && <ErrorMassage status={error.status} />}

      {isLoading && <PageLoader />}

      {!isLoading && products?.[1] && (
        <Catalog type="small">
          {products?.[1].map((item) => (
            <Product
              product={item}
              key={item?.id}
              isSaved={user?.savedProducts?.includes(item?.id)}
            />
          ))}
        </Catalog>
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
