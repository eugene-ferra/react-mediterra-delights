import Button from "../../common/Button/Button";
import Container from "../Container/Container";
import Title from "../../common/Title/Title";
import Text from "../../common/Text/Text";
import Picture from "../../common/Picture/Picture";
import img from "../../../assets/promo.jpg";
import styles from "./Promo.module.scss";

const Promo = () => {
  return (
    <Container>
      <div className={styles.promo}>
        <div className={styles.content}>
          <Title className={styles.title} type={"big"}>
            Пориньте у світ Української кухні!
          </Title>
          <Text className={styles.text}>
            Вітаємо у ресторані Ukraine Delights, де ви зможете найкращі страви від наших
            кухарів. Наше меню насичене вишуканими стравами, які сповнені свіжості,
            аромату та витонченості.
          </Text>
          <Button asTag={"Link"} to={"/products"}>
            Переглянути меню
          </Button>
        </div>
        <Picture className={styles.img} formats={{ jpg: img }} />
      </div>
    </Container>
  );
};

export default Promo;
