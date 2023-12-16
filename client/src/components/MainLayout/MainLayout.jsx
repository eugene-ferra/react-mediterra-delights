import styles from "./MainLayout.module.scss";

const MainLayout = ({ children, className, style }) => {
  return (
    <main className={`${styles.main} ${className || ""}`} style={style}>
      {children}
    </main>
  );
};

export default MainLayout;
