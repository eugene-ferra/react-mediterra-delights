import { useState } from "react";
import { useOrder } from "../hooks/useOrder";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Container from "../components/layout/Container/Container";
import Title from "../components/common/Title/Title";
import OrderFullBlock from "../components/block/OrderFullBlock/OrderFullBlock";
import SubmitSearch from "../components/layout/SubmitSearch/SubmitSearch";

const CheckOrderPage = () => {
  const [number, setNumber] = useState(null);
  const { isLoading } = useOrder(number);
  const { order } = useOrder(number);

  return (
    <>
      <Header />
      <MainLayout style={{ paddingBottom: "20px" }}>
        <Container>
          <Title type={"global"}>Відстеження замовлення</Title>

          <SubmitSearch
            setValue={setNumber}
            isLoading={isLoading}
            inputTitle={"Введіть номер замовлення*"}
          >
            <OrderFullBlock order={order?.[0]} />
          </SubmitSearch>
        </Container>
      </MainLayout>
      <Footer />
    </>
  );
};

export default CheckOrderPage;
