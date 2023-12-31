import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import OneArticlePage from "./pages/OneArticlePage.jsx";
import OneProductPage from "./pages/OneProductPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductManage from "./components/ProductManage/ProductManage.jsx";
import ArticleManage from "./components/ArticleManage/ArticleManage.jsx";
import CommentManage from "./components/CommentManage/CommentsManage.jsx";
import ReviewManage from "./components/ReviewManage/ReviewManage.jsx";
import OrdersManage from "./components/OrdersManage/OrdersManage.jsx";
import ProductManageAdd from "./components/ProductManage/ProductManageAdd.jsx";
import ProductEdit from "./components/ProductManage/ProductEdit.jsx";
import ArticleManageAdd from "./components/ArticleManage/ArticleManageAdd.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/admin",
        element: <AdminPage />,
        children: [
          { path: "", element: "home" },
          { path: "products", element: <ProductManage /> },
          { path: "products/new", element: <ProductManageAdd /> },
          { path: "products/:id", element: <ProductEdit /> },
          { path: "articles", element: <ArticleManage /> },
          { path: "articles/new", element: <ArticleManageAdd /> },
          { path: "comments", element: <CommentManage /> },
          { path: "reviews", element: <ReviewManage /> },
          { path: "orders", element: <OrdersManage /> },
        ],
      },
      { path: "/account", element: <AccountPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password/:token", element: <ResetPasswordPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:slug", element: <OneProductPage /> },
      { path: "/articles", element: <ArticlesPage /> },
      { path: "/articles/:slug", element: <OneArticlePage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/order", element: <OrderPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contacts", element: <ContactPage /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
