import MainLayout from "../components/MainLayout/MainLayout";
import NavSidebar from "../components/NavSidebar/NavSidebar";
import food from "../assets/food.svg";
import article from "../assets/article.svg";
import comment from "../assets/comment.svg";
import review from "../assets/review.svg";
import order from "../assets/order.svg";
import home from "../assets/home.svg";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <MainLayout style={{ display: "flex", overflowX: "hidden", position: "relative" }}>
        <NavSidebar
          links={[
            { to: "", text: "Головна", image: home, end: true },
            { to: "products", text: "Продукти", image: food },
            { to: "articles", text: "Статті", image: article },
            { to: "comments", text: "Коментарі", image: comment },
            { to: "reviews", text: "Відгуки", image: review },
            { to: "orders", text: "Замовлення", image: order },
          ]}
        />
        <Outlet />
      </MainLayout>
    </>
  );
};

export default AdminPage;
