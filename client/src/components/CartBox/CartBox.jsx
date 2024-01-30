import { useCart } from "../../hooks/useCart";
import { useManyProductsByIds } from "../../hooks/useManyProductsByIds";
import { useProductById } from "../../hooks/useProductById";
import CartItem from "../CartItem/CartItem";
import Button from "../common/Button/Button";
import Container from "../common/Container/Container";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import Loader from "../common/Loader/Loader";
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

  const totalSum = !isProductLoading
    ? cart?.reduce((acc, item) => {
        const product = products?.find((p) => p.id === item.id);
        if (product) {
          // Используйте с учетом скидки, если она есть
          const price = product.discountPrice || product.price;
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
        <Loader type={"global"} />
      ) : (
        <div className={styles.inner}>
          <div className={styles.cards}>
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
              <Text> {totalSum} грн</Text>
            </div>
            <Button asTag={"Link"} to={"/order"}>
              Оформити замовлення
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CartBox;
