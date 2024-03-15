import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import OrderBox from "../components/OrderBox/OrderBox";

const OrderPage = () => {
  return (
    <>
      <Header />
      <MainLayout
        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <OrderBox />
      </MainLayout>
      <Footer />
    </>
  );
};

export default OrderPage;
