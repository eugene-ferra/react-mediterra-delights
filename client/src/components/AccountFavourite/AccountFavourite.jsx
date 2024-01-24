import { useUser } from "../../hooks/useUser";
import Title from "../common/Title/Title";
import { useFavouritesProducts } from "./useFavouritesProducts";
import Catalog from "../Catalog/Catalog";
import Product from "../Product/Product";
import Loader from "../common/Loader/Loader";
import Button from "../common/Button/Button";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";

const AccountFavourite = () => {
  const { user } = useUser();

  const { products, isLoading, error } = useFavouritesProducts(user?.savedProducts);

  return (
    <>
      <Title>Ваші улюблені страви:</Title>
      {error?.[0] != null ? (
        <ErrorMassage status={error?.[0]} />
      ) : isLoading ? (
        <Loader type={"global"} />
      ) : products?.length > 0 ? (
        <Catalog type={"small"}>
          {products?.map((item) => (
            <Product
              product={item}
              key={item?.id}
              isSaved={user?.savedProducts?.includes(item?.id)}
            />
          ))}
        </Catalog>
      ) : (
        <>
          <Title type={"small"}>Ви ще не додали жодного товару в улюблені</Title>
          <Button asTag={"Link"} to={"/products"}>
            Перейти до меню
          </Button>
        </>
      )}
    </>
  );
};

export default AccountFavourite;
