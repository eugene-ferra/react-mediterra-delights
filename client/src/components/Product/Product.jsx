import { Link } from "react-router-dom";
import styles from "./Product.module.scss";
import Picture from "../common/Picture/Picture";
import Title from "../common/Title/Title";
import Text from "../common/Text/Text";
import Button from "../common/Button/Button";
import WeightIcon from "../svg/WeightIcon";
import TimeIcon from "../svg/TimeIcon";
import Stars from "../common/Stars/Stars";
import Price from "../common/Price/Price";
import Marker from "../common/Marker/Marker";

const Product = ({ product }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className={styles.product}>
        <div className={styles.options}>
          {product?.isNewProduct && <Marker type={"green"}>Новинка</Marker>}
          {product?.discountPrice && <Marker type={"red"}>% Акція</Marker>}
          {product?.isVegan === true && <Marker type={"blue"}>Vegan</Marker>}
        </div>

        <Link to={`/products/${product?.slug}`}>
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
            <Price discountPrice={product?.discountPrice} price={product?.price} />
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
