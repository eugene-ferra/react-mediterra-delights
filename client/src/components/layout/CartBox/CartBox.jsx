import { useCart } from "../../../hooks/useCart";
import { useManyProductsByIds } from "../../../hooks/useManyProductsByIds";
import { calcTotalSum } from "../../../utils/calcTotalSum";
import { calcTotalDiscountPrice } from "../../../utils/calcTotalDiscountPrice";
import CartItem from "../../block/CartItem/CartItem";
import Button from "../../common/Button/Button";
import Container from "../Container/Container";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import Price from "../../common/Price/Price";
import Text from "../../common/Text/Text";
import Title from "../../common/Title/Title";
import PageLoader from "../PageLoader/PageLoader";
import styles from "./CartBox.module.scss";

const CartBox = () => {
  const { cart, updateCart, deleteFromCart } = useCart();

  const {
    products,
    isLoading: isProductLoading,
    error: productError,
  } = useManyProductsByIds(cart?.map((item) => item?.id));

  const totalDiscountPrice = calcTotalDiscountPrice(cart, products?.[1]);
  const totalSum = calcTotalSum(cart, products?.[1]);

  return (
    <>
      {productError?.status && <ErrorMassage status={productError?.status} />}
      {isProductLoading && <PageLoader />}

      {!isProductLoading && products && cart && (
        <Container>
          <Title type={"global"}>Товари у кошику</Title>

          <div className={styles.inner}>
            <div className={styles.cards}>
              {cart?.length === 0 && (
                <Text align={"center"} className={styles.noItems}>
                  В кошику немає жодного товару!
                </Text>
              )}
              {cart?.map((item) => (
                <CartItem
                  id={item?.id}
                  quantity={item?.quantity}
                  key={item?.id}
                  updateCart={updateCart}
                  deleteFromCart={deleteFromCart}
                />
              ))}
            </div>
            <div className={styles.reciept}>
              <Title type={"small"} align={"center"}>
                Ваше замовлення
              </Title>
              <div className={styles.sum}>
                <Text>Загальна сума</Text>
                <Price discountPrice={totalDiscountPrice} price={totalSum} />
              </div>
              {cart?.length === 0 ? (
                <Button disabled={true}>Оформити замовлення</Button>
              ) : (
                <Button asTag={"Link"} to={"/order"} disabled={true}>
                  Оформити замовлення
                </Button>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default CartBox;
