import styles from "./Price.module.scss";

const Price = ({ discountPrice, price, className }) => {
  return (
    <>
      {discountPrice ? (
        <div className={className || ""}>
          <p className={styles.priceOld}>{price} грн</p>
          <p className={styles.price}>{discountPrice} грн</p>
        </div>
      ) : (
        <div className={className || ""}>
          <p className={styles.price}>{price} грн</p>
        </div>
      )}
    </>
  );
};

export default Price;
