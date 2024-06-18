import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const AppLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          position: "bottom-center",
          gutter: 20,
          duration: 5000,
        }}
      />
    </>
  );
};

export default AppLayout;
