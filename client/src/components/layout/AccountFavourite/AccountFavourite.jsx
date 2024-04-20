import { useUser } from "../../../hooks/useUser";
import { useFavouritesProducts } from "./useFavouritesProducts";
import Title from "../../common/Title/Title";
import Catalog from "../Catalog/Catalog";
import Product from "../../block/Product/Product";
import Loader from "../../common/Loader/Loader";
import Button from "../../common/Button/Button";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";

const AccountFavourite = () => {
  const { user } = useUser();
  const { products, isLoading, error } = useFavouritesProducts(user?.savedProducts);

  return (
    <>
      <Title>Ваші улюблені страви:</Title>

      {error && <ErrorMassage status={error.status} />}

      {isLoading && <Loader type="global" />}

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
