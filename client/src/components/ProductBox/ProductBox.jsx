import styles from "./ProductBox.module.scss";
import Container from "../common/Container/Container";
import Title from "../common/Title/Title";
import Stars from "../common/Stars/Stars";
import Text from "../common/Text/Text";
import Button from "../common/Button/Button";
import Picture from "../common/Picture/Picture";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import ThumbsGallery from "../common/ThumbsGallery/ThumbsGallery";
import Marker from "../common/Marker/Marker";
import Price from "../common/Price/Price";
import Char from "../common/Char/Char";
import Modal from "../common/Modal/Modal";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import Form from "../common/Form/Form";
import TextArea from "../common/TextArea/TextArea";
import StarRating from "../common/StarRating/StarRating";

const ProductBox = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <Container>
        <div className={styles.box}>
          <div className={styles.top}>
            <div className={styles.images}>
              {product?.images.length > 0 ? (
                <ThumbsGallery
                  images={[product.imgCover, ...product.images]}
                  alt={product?.title}
                />
              ) : (
                <Picture
                  className={styles.picture}
                  formats={product?.imgCover}
                  alt={product?.title}
                />
              )}
            </div>
            <div className={styles.info}>
              <Title>{product?.title}</Title>
              <Text>{product?.category}</Text>
              {(product?.isNewProduct || product?.discountPrice || product?.isVegan) && (
                <div className={styles.options}>
                  {product?.isNewProduct && <Marker type={"green"}>Новинка</Marker>}
                  {product?.discountPrice && <Marker type={"red"}>% Акція</Marker>}
                  {product?.isVegan === true && <Marker type={"blue"}>Vegan</Marker>}
                </div>
              )}
              <Stars rating={product?.avgRating} reviews={product?.reviewCount} />

              <Text> {product?.description}</Text>
              <div className={styles.actions}>
                <div className={styles.buy}>
                  <>
                    <Price
                      discountPrice={product?.discountPrice}
                      price={product?.price}
                    />
                    <Button className={styles.buyBtn}>До кошика</Button>
                  </>
                </div>
                <Button>В улюблені</Button>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.moreInfo}>
              <Title type={"small"} className={styles.title}>
                Детальна інформація
              </Title>
              <div className={styles.chars}>
                <Char name={"Час приготування"} value={`${product?.cookTime} хв`} />
                <Char name={"Вага страви"} value={`${product?.weight} г`} />

                <Char
                  name={"Білки (на 100 г)"}
                  value={
                    product?.nutrients.protein
                      ? `${product?.nutrients.protein} г`
                      : "Не вказано"
                  }
                />
                <Char
                  name={"Жири (на 100 г)"}
                  value={
                    product?.nutrients.fats
                      ? `${product?.nutrients.fats} г`
                      : "Не вказано"
                  }
                />
                <Char
                  name={"Вуглеводи (на 100 г)"}
                  value={
                    product?.nutrients.carbohydrates
                      ? `${product?.nutrients.carbohydrates} г`
                      : "Не вказано"
                  }
                />
                <Char
                  name={"Калорійність (на 100 г)"}
                  value={
                    product?.nutrients.calories
                      ? `${product?.nutrients.calories} ккал`
                      : "Не вказано"
                  }
                />
              </div>
              {product?.fullText && <Text>{product?.fullText}</Text>}
            </div>
            <div className={styles.reviews}>
              <div className={styles.reviewsHeader}>
                <Title type={"small"}>Відгуки</Title>
                <Button onClick={() => setIsModalOpen(true)}>Написати відгук</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {user ? (
          <Form style={{ padding: 0 }} onSubmit={(e) => e.preventDefault()}>
            <Title align={"center"} type={"small"}>
              Сподобалася страва? Залиште відгук!
            </Title>
            <StarRating title={"Оцінка*"} />
            <TextArea type={"text"} title={"Коментар*"} name={"review"} />
          </Form>
        ) : (
          <div>
            <Title align={"center"} type={"small"}>
              Залишати відгуки можуть лише користувачі сайту!
            </Title>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "20px",
                padding: "10px 5px",
              }}
            >
              <Button asTag={"Link"} to={"/login"}>
                Увійти
              </Button>
              <Button type={"outline-red"} asTag={"Link"} to={"/signup"}>
                Зареєструватися
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProductBox;
