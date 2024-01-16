import { Link } from "react-router-dom";
import styles from "./Product.module.scss";
import Picture from "../common/Picture/Picture";
import Title from "../common/Title/Title";
import Text from "../common/Text/Text";
import Button from "../common/Button/Button";
import WeightIcon from "../svg/WeightIcon";
import TimeIcon from "../svg/TimeIcon";
import Stars from "../common/Stars/Stars";

const Product = ({ product }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className={styles.product}>
        <div className={styles.options}>
          {product?.isNewProduct && <div className={styles.optionNew}>Новинка</div>}
          {product?.discountPrice && <div className={styles.optionSale}>% Акція</div>}
          {product?.isVegan === true && <div className={styles.option}>Vegan</div>}
        </div>

        <Link to={`/product/${product?.slug}`}>
          <div className={styles.content}>
            <div>
              <Picture
                formats={product?.imgCover}
                className={styles.img}
                alt={product?.title}
              />
              <Title Title type={"small"}>
                {product?.title}
              </Title>
            </div>
            <Stars rating={product?.avgRating} reviews={product?.reviewCount} />

            <div className={styles.infos}>
              <p className={styles.info}>
                <WeightIcon />
                {product?.weight} г
              </p>

              <p className={styles.info}>
                <TimeIcon />
                {product?.cookTime} хв
              </p>
            </div>

            <Text type={"small"}>{product?.description}</Text>
          </div>
        </Link>
        <div className={styles.buy}>
          <div className={styles.priceBox}>
            {product?.discountPrice ? (
              <>
                <p className={styles.priceOld}>{product?.price} грн</p>
                <p className={styles.price}>{product?.discountPrice} грн</p>
              </>
            ) : (
              <p className={styles.price}>{product?.price} грн</p>
            )}
          </div>
          <Button type={"small"} className={styles.button}>
            До кошика
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
