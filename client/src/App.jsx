import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ChunkLoading from "./pages/ChunkLoading.jsx";
import { CartProvider } from "./components/context/CartContext.jsx";
import { ThemeProvider } from "./components/context/ThemeContext.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const WorkersPage = lazy(() => import("./pages/WorkersPage.jsx"));
const ProductsPage = lazy(() => import("./pages/ProductsPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));
const AccountPage = lazy(() => import("./pages/AccountPage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage.jsx"));
const OneArticlePage = lazy(() => import("./pages/OneArticlePage.jsx"));
const OneProductPage = lazy(() => import("./pages/OneProductPage.jsx"));
const OrderPage = lazy(() => import("./pages/OrderPage.jsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage.jsx"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage.jsx"));
const ServerErrorPage = lazy(() => import("./pages/ServerErrorPage.jsx"));
const ForbiddenPage = lazy(() => import("./pages/ForbiddenPage.jsx"));
const CheckOrderPage = lazy(() => import("./pages/CheckOrderPage.jsx"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage.jsx"));
const AdminMain = lazy(() => import("./components/layout/AdminMain/AdminMain.jsx"));
const ArticleManage = lazy(() =>
  import("./components/layout/ArticleManage/ArticleManage.jsx")
);
const WorkersManage = lazy(() =>
  import("./components/layout/WorkersManage/WorkersManage.jsx")
);
const CommentManage = lazy(() =>
  import("./components/layout/CommentManage/CommentsManage.jsx")
);
const ReviewManage = lazy(() =>
  import("./components/layout/ReviewManage/ReviewManage.jsx")
);
const OrdersManage = lazy(() =>
  import("./components/layout/OrdersManage/OrdersManage.jsx")
);
const ProductManageAdd = lazy(() =>
  import("./components/layout/ProductManageAdd/ProductManageAdd.jsx")
);
const WorkersManageAdd = lazy(() =>
  import("./components/layout/WorkersManageAdd/WorkersManageAdd.jsx")
);
const ProductManageEdit = lazy(() =>
  import("./components/layout/ProductManageEdit/ProductManageEdit.jsx")
);
const WorkersManageEdit = lazy(() =>
  import("./components/layout/WorkerManageEdit/WorkersManageEdit.jsx")
);
const ArticleManageAdd = lazy(() =>
  import("./components/layout/ArticleManageAdd/ArticleManageAdd.jsx")
);
const ArticleManageEdit = lazy(() =>
  import("./components/layout/ArticleManageEdit/ArticleManageEdit.jsx")
);
const AccountMain = lazy(() =>
  import("./components/layout/AccountMain/AccountMain.jsx")
);
const AccountFavourite = lazy(() =>
  import("./components/layout/AccountFavourite/AccountFavourite.jsx")
);
const AccountSaved = lazy(() =>
  import("./components/layout/AccountSaved/AccountSaved.jsx")
);
const AccountOrders = lazy(() =>
  import("./components/layout/AccountOrders/AccountOrders.jsx")
);

const ProductManage = lazy(() =>
  import("./components/layout/ProductManage/ProductManage.jsx")
);

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<ChunkLoading />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <ServerErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/admin",
        element: <AdminPage />,
        children: [
          { path: "", element: <AdminMain /> },
          { path: "products", element: <ProductManage /> },
          { path: "products/new", element: <ProductManageAdd /> },
          { path: "products/:id", element: <ProductManageEdit /> },
          { path: "articles", element: <ArticleManage /> },
          { path: "articles/new", element: <ArticleManageAdd /> },
          { path: "articles/:id", element: <ArticleManageEdit /> },
          { path: "workers", element: <WorkersManage /> },
          { path: "workers/new", element: <WorkersManageAdd /> },
          { path: "workers/:id", element: <WorkersManageEdit /> },
          { path: "comments", element: <CommentManage /> },
          { path: "reviews", element: <ReviewManage /> },
          { path: "orders", element: <OrdersManage /> },
        ],
      },
      {
        path: "/account",
        element: <AccountPage />,
        children: [
          { path: "", element: <AccountMain /> },
          { path: "favourite", element: <AccountFavourite /> },
          { path: "saved", element: <AccountSaved /> },
          { path: "orders", element: <AccountOrders /> },
        ],
      },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password/:token", element: <ResetPasswordPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:slug", element: <OneProductPage /> },
      { path: "/articles", element: <ArticlesPage /> },
      { path: "/articles/:slug", element: <OneArticlePage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/order", element: <OrderPage /> },
      { path: "/order/success/:orderNumber", element: <OrderSuccessPage /> },
      { path: "/check-order", element: <CheckOrderPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/workers", element: <WorkersPage /> },
      { path: "/contacts", element: <ContactPage /> },
      { path: "/forbidden", element: <ForbiddenPage /> },
      { path: "500", element: <ServerErrorPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retryDelay: 0,
    },
  },
});

const App = () => {
  return (
    <CartProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </CartProvider>
  );
};

export default App;
