import { Link } from "react-router-dom";
import Container from "../Container/Container";
import Picture from "../../common/Picture/Picture";
import Title from "../../common/Title/Title";
import Text from "../../common/Text/Text";
import orderSuccess from "../../../assets/orderSuccess.png";
import styles from "./OrderSuccess.module.scss";

const OrderSuccess = ({ order }) => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <Picture
          className={styles.img}
          formats={{ jpg: orderSuccess }}
          alt={"Замовлення прийнято"}
        />
        <div>
          <Title>Ваше замовлення прийнято. Очікуйте на дзвінок менеджера!</Title>
          <div className={styles.info}>
            <Text type={"big"}>Номер замовлення - {order?.number}</Text>
            <Text>Статус замовлення: {order?.status}</Text>
            <Text>Статус оплати: {order?.isPayed ? "Оплачено" : "Не оплачено"}</Text>
          </div>
          <Text>
            Ви можете відстежити стасус замовлення{" "}
            <Link className={styles.link} to={"/check-order"}>
              на цій сторінці
            </Link>
            , або в особистому кабінеті
          </Text>
        </div>
      </div>
    </Container>
  );
};

export default OrderSuccess;
