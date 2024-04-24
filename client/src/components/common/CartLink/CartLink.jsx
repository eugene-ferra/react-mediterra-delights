import { Link } from "react-router-dom";
import Picture from "../Picture/Picture";
import cartImg from "../../../assets/cart.svg";
import Text from "../Text/Text";
import styles from "./CartLink.module.scss";

const CartLink = ({ className, count = 0 }) => {
  return (
    <Link className={`${styles.cart} ${className || ""}`} to={"/cart"}>
      <Picture formats={{ jpg: cartImg }} />
      <Text type={"small"} className={styles.num}>
        {count}
      </Text>
    </Link>
  );
};

export default CartLink;
