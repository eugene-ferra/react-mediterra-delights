import MainLayout from "../components/MainLayout/MainLayout";
import { Outlet } from "react-router-dom";
import Panel from "../components/Panel/Panel";
import Header from "../components/Header/Header";
import HomeIcon from "../components/svg/HomeIcon";
import FoodIcon from "../components/svg/FoodIcon";
import ArticleIcon from "../components/svg/ArticleIcon";
import CommenIcon from "../components/svg/CommenIcon";
import ReviewIcon from "../components/svg/ReviewIcon";
import OrderIcon from "../components/svg/OrderIcon";

const AdminPage = () => {
  return (
    <>
      <Header />
      <MainLayout style={{ display: "flex", overflowX: "hidden", position: "relative" }}>
        <Panel
          links={[
            { to: "", text: "Головна", image: <HomeIcon />, end: true },
            { to: "products?page=1", text: "Продукти", image: <FoodIcon /> },
            { to: "articles?page=1", text: "Статті", image: <ArticleIcon /> },
            { to: "comments", text: "Коментарі", image: <CommenIcon /> },
            { to: "reviews?page=1", text: "Відгуки", image: <ReviewIcon /> },
            { to: "orders", text: "Замовлення", image: <OrderIcon /> },
          ]}
        >
          <Outlet />
        </Panel>
      </MainLayout>
    </>
  );
};

export default AdminPage;
