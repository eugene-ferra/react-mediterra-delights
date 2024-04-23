import { Link } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";
import Picture from "../../common/Picture/Picture";
import Title from "../../common/Title/Title";
import Marker from "../../common/Marker/Marker";
import Price from "../../common/Price/Price";
import TrashIcon from "../../svg/TrashIcon";
import Counter from "../../common/Counter/Counter";
import styles from "./CartItem.module.scss";

const CartItem = ({ id, quantity, updateCart, deleteFromCart }) => {
  const { product } = useProduct(id);

  return (
    <>
      {product && quantity && (
        <div className={styles.cartItem}>
          <Link to={`/products/${product?.slug}`}>
            <Picture
              formats={product?.imgCover}
              alt={product?.title}
              className={styles.img}
            />
          </Link>
          <div className={styles.main}>
            <Link to={`/products/${product?.slug}`} className={styles.text}>
              <Title type={"small"}>{product?.title}</Title>
              <div className={styles.markers}>
                {product?.isNewProduct && <Marker type={"green"}>Новинка</Marker>}
                {product?.discountPrice && <Marker type={"red"}>% Акція</Marker>}
                {product?.isVegan === true && <Marker type={"blue"}>Vegan</Marker>}
              </div>
            </Link>
            <Counter
              onMinus={() => {
                quantity > 1 && updateCart({ id: id, quantity: quantity - 1 });
              }}
              onPlus={() => {
                updateCart({ id: id, quantity: quantity + 1 });
              }}
              label={quantity}
            />
            <Price
              className={styles.priceBlock}
              discountPrice={product?.discountPrice * quantity}
              price={product?.price * quantity}
            />
            <button className={styles.delete} onClick={() => deleteFromCart(id)}>
              <TrashIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
