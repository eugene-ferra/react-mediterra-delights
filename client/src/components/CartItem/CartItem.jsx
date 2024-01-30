import { Link } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById";
import styles from "./CartItem.module.scss";
import Picture from "../common/Picture/Picture";
import Title from "../common/Title/Title";
import Marker from "../common/Marker/Marker";
import Price from "../common/Price/Price";
import TrashIcon from "../svg/TrashIcon";

const CartItem = ({ id, quantity, updateCart, deleteFromCart }) => {
  const { product } = useProductById(id);

  return (
    <>
      {product && quantity && (
        <div className={styles.cartItem}>
          <div className={styles.content}>
            <Link to={`/product/${product?.slug}`}>
              <Picture
                formats={product?.imgCover}
                alt={product?.title}
                className={styles.img}
              />
            </Link>
            <div className={styles.main}>
              <Link to={`/product/${product?.slug}`} className={styles.text}>
                <Title type={"small"}>{product?.title}</Title>
                <div className={styles.markers}>
                  {product?.isNewProduct && <Marker type={"green"}>Новинка</Marker>}
                  {product?.discountPrice && <Marker type={"red"}>% Акція</Marker>}
                  {product?.isVegan === true && <Marker type={"blue"}>Vegan</Marker>}
                </div>
              </Link>
              <div className={styles.counter}>
                <button
                  className={styles.btn}
                  onClick={() => {
                    quantity > 1 && updateCart({ id: id, quantity: quantity - 1 });
                  }}
                >
                  -
                </button>
                <p className={styles.count}>{quantity}</p>
                <button
                  className={styles.btn}
                  onClick={() => {
                    updateCart({ id: id, quantity: quantity + 1 });
                  }}
                >
                  +
                </button>
              </div>
              <div className={styles.priceBlock}>
                <Price
                  discountPrice={product?.discountPrice * quantity}
                  price={product?.price * quantity}
                />
              </div>
              <button className={styles.delete} onClick={() => deleteFromCart(id)}>
                <TrashIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
