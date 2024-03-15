import Price from "../common/Price/Price";
import Text from "../common/Text/Text";
import styles from "./OrderItem.module.scss";

const OrderItem = ({ title, weight, quantity, price, discountPrice }) => {
  return (
    <div className={styles.orderItem}>
      <Text className={styles.title}>
        {title}, {weight}г
      </Text>
      <Text className={styles.quantity} type={"small"}>
        x{quantity}
      </Text>

      <Price discountPrice={discountPrice * quantity} price={price * quantity} />
    </div>
  );
};

export default OrderItem;
