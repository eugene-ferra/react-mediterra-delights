import { Link } from "react-router-dom";
import { lastDigit } from "../../../utils/lastDigit";
import Picture from "../../common/Picture/Picture";
import Text from "../../common/Text/Text";
import styles from "./OrderFullItem.module.scss";
import Price from "../../common/Price/Price";

const OrderFullItem = ({ title, id, weight, quantity, price, img }) => {
  return (
    <div className={styles.order}>
      <Link to={`/products/${id}`} className={styles.inner}>
        <Picture formats={img} alt={title} className={styles.img} />
        <div className={styles.info}>
          <Text>
            {title}, {weight}г
          </Text>

          <div className={styles.stats}>
            <Text type={"small"}>
              {quantity} порц
              {lastDigit(quantity) == 1
                ? "ія"
                : lastDigit(quantity) == 5 || lastDigit(quantity) == 0
                ? "ій"
                : "ії"}
            </Text>
            <Price price={price} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OrderFullItem;
