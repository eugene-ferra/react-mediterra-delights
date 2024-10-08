import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import OrderBox from "../components/layout/OrderBox/OrderBox";

const OrderPage = () => {
  useEffect(() => {
    document.title = "Оформлення замовлення";
  }, []);

  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.length === 0) navigate("/");
  }, [cart, navigate]);

  return (
    <>
      {cart.length > 0 && (
        <>
          <Header />
          <MainLayout>
            <OrderBox />
          </MainLayout>
          <Footer />
        </>
      )}
    </>
  );
};

export default OrderPage;
