import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
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
