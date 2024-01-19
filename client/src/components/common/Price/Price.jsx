import styles from "./Price.module.scss";

const Price = ({ discountPrice, price }) => {
  return (
    <>
      {discountPrice ? (
        <div>
          <p className={styles.priceOld}>{price} грн</p>
          <p className={styles.price}>{discountPrice} грн</p>
        </div>
      ) : (
        <p className={styles.price}>{price} грн</p>
      )}
    </>
  );
};

export default Price;
