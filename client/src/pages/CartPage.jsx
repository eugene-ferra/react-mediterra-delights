import CartBox from "../components/CartBox/CartBox";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";

const CartPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <CartBox />
      </MainLayout>
      <Footer />
    </>
  );
};

export default CartPage;
