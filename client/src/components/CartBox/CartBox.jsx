import { useCart } from "../../hooks/useCart";
import { useManyProductsByIds } from "../../hooks/useManyProductsByIds";
import CartItem from "../CartItem/CartItem";
import Button from "../common/Button/Button";
import Container from "../common/Container/Container";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import Loader from "../common/Loader/Loader";
import Price from "../common/Price/Price";
import Text from "../common/Text/Text";
import Title from "../common/Title/Title";
import styles from "./CartBox.module.scss";

const CartBox = () => {
  const { cart, updateCart, deleteFromCart } = useCart();

  const {
    products,
    isLoading: isProductLoading,
    error: productError,
  } = useManyProductsByIds(cart?.map((item) => item?.id));

  const totalDiscountPrice = !isProductLoading
    ? cart?.reduce((acc, item) => {
        const product = products?.find((p) => p.id === item.id);
        if (product) {
          const price = product.discountPrice || product?.price;
          acc += price * item.quantity;
        }
        return acc;
      }, 0)
    : 0;

  const totalSum = !isProductLoading
    ? cart?.reduce((acc, item) => {
        const product = products?.find((p) => p.id === item.id);
        if (product) {
          const price = product.price;
          acc += price * item.quantity;
        }
        return acc;
      }, 0)
    : 0;

  return (
    <Container>
      <Title type={"global"}>Товари у кошику</Title>
      {productError[0]?.status && <ErrorMassage status={productError?.status} />}
      {isProductLoading ? (
        <div>
          <Loader type={"global"} />
        </div>
      ) : (
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
      )}
    </Container>
  );
};

export default CartBox;
