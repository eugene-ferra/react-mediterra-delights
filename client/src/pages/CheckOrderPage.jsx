import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import Button from "../components/common/Button/Button";
import Container from "../components/common/Container/Container";
import Form from "../components/common/Form/Form";
import Input from "../components/common/Input/Input";
import Title from "../components/common/Title/Title";
import { useState } from "react";
import OrderFullBlock from "../components/OrderFullBlock/OrderFullBlock";
import { useOrderById } from "../hooks/useOrderById";

const CheckOrderPage = () => {
  const [value, setValue] = useState(null);
  const [number, setNumber] = useState(null);
  const { isLoading } = useOrderById(number);

  return (
    <>
      <Header />
      <MainLayout style={{ padding: "0px 0px 40px" }}>
        <Container>
          <Title type={"global"}>Відстеження замовлення</Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setNumber(value);
            }}
            style={{ padding: 0, gap: "20px" }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                alignItems: "flex-end",
              }}
            >
              <Input
                style={{ width: "300px" }}
                name={"number"}
                title={"Введіть номер замовлення*"}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button disabled={!value || isLoading}>Пошук</Button>
            </div>
          </Form>

          <div style={{ marginTop: "40px" }}>
            <OrderFullBlock id={number} />
          </div>
        </Container>
      </MainLayout>
      <Footer />
    </>
  );
};

export default CheckOrderPage;
