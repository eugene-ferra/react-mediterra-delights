import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import Container from "../components/common/Container/Container";
import Title from "../components/common/Title/Title";

const OrderPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <Container>
          <Title type={"global"}>Сторінка в розробці</Title>
        </Container>
      </MainLayout>
      <Footer />
    </>
  );
};

export default OrderPage;
