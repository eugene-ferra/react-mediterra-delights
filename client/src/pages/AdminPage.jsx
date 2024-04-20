import MainLayout from "../components/layout/MainLayout/MainLayout";
import { Outlet, useNavigate } from "react-router-dom";
import Panel from "../components/layout/Panel/Panel";
import Header from "../components/layout/Header/Header";
import HomeIcon from "../components/svg/HomeIcon";
import FoodIcon from "../components/svg/FoodIcon";
import ArticleIcon from "../components/svg/ArticleIcon";
import CommenIcon from "../components/svg/CommenIcon";
import ReviewIcon from "../components/svg/ReviewIcon";
import OrderIcon from "../components/svg/OrderIcon";
import { useUser } from "../hooks/useUser";
import PageLoader from "../components/layout/PageLoader/PageLoader";

const AdminPage = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (!user || user?.role !== "admin") navigate("/forbidden");

  return (
    <>
      {isLoading && (
        <MainLayout>
          <PageLoader />
        </MainLayout>
      )}
      {user && (
        <>
          <Header />

          <MainLayout>
            <Panel
              links={[
                { to: "", text: "Головна", image: <HomeIcon />, end: true },
                { to: "products?page=1", text: "Продукти", image: <FoodIcon /> },
                { to: "articles?page=1", text: "Статті", image: <ArticleIcon /> },
                { to: "comments?page=1", text: "Коментарі", image: <CommenIcon /> },
                { to: "reviews?page=1", text: "Відгуки", image: <ReviewIcon /> },
                { to: "orders", text: "Замовлення", image: <OrderIcon /> },
              ]}
            >
              <Outlet />
            </Panel>
          </MainLayout>
        </>
      )}
    </>
  );
};

export default AdminPage;
