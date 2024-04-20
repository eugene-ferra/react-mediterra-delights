import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Button from "../components/common/Button/Button";
import Container from "../components/layout/Container/Container";
import Form from "../components/layout/Form/Form";
import Input from "../components/common/Input/Input";
import Title from "../components/common/Title/Title";
import { useState } from "react";
import OrderFullBlock from "../components/block/OrderFullBlock/OrderFullBlock";
import { useOrderById } from "../hooks/useOrderById";
import SubmitSearch from "../components/layout/SubmitSearch/SubmitSearch";

const CheckOrderPage = () => {
  const [number, setNumber] = useState(null);
  const { isLoading } = useOrderById(number);

  return (
    <>
      <Header />
      <MainLayout>
        <Container>
          <Title type={"global"}>Відстеження замовлення</Title>

          <SubmitSearch
            setValue={setNumber}
            isLoading={isLoading}
            inputTitle={"Введіть номер замовлення*"}
          >
            <OrderFullBlock id={number} />
          </SubmitSearch>
        </Container>
      </MainLayout>
      <Footer />
    </>
  );
};

export default CheckOrderPage;
