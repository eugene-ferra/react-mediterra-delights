import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import Title from "../components/common/Title/Title";
import { useOrderById } from "../hooks/useOrderById";
import Picture from "../components/common/Picture/Picture";
import orderSuccess from "../assets/orderSuccess.png";
import Text from "../components/common/Text/Text";
import Container from "../components/common/Container/Container";
import Loader from "../components/common/Loader/Loader";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();

  const { order, isLoading, isError, error } = useOrderById(orderNumber);

  return (
    <>
      <Header />
      <MainLayout
        style={{
          padding: "50px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isError ? (
          <ErrorMassage status={error.status} />
        ) : isLoading ? (
          <Container>
            <Loader type={"global"} />
          </Container>
        ) : (
          <Container>
            <div
              style={{
                display: "flex",

                justifyContent: "center",
                flexWrap: "wrap",
                gap: "40px 70px",
              }}
            >
              <Picture
                formats={{ jpg: orderSuccess }}
                alt={"Замовлення прийнято"}
                style={{
                  flex: "0 0 300px",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
              <div style={{ flex: "1 1 300px" }}>
                <Title>Ваше замовлення прийнято. Очікуйте на дзвінок менеджера!</Title>
                <Text style={{ marginTop: "20px" }} type={"big"}>
                  Номер замовлення - {orderNumber}
                </Text>
                <Text style={{ marginTop: "10px" }}>
                  Статус замовлення: {order?.[0]?.status}
                </Text>
                <Text style={{ marginTop: "10px" }}>
                  Статус оплати: {order?.[0]?.isPayed ? "Оплачено" : "Не оплачено"}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Ви можете відстежити стасус замовлення{" "}
                  <Link
                    style={{
                      fontWeight: 500,
                      color: "var(--accent-color)",
                      fontSize: "16px",
                    }}
                    to={"/check-order"}
                  >
                    на цій сторінці
                  </Link>
                  , або в особистому кабінеті
                </Text>
              </div>
            </div>
          </Container>
        )}
      </MainLayout>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
