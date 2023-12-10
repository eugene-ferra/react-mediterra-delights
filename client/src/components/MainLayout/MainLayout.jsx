import styles from "./MainLayout.module.scss";

const MainLayout = ({ children, className }) => {
  return <main className={`${styles.main} ${className || ""}`}>{children}</main>;
};

export default MainLayout;
