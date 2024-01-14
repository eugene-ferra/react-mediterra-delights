import styles from "./Catalog.module.scss";

const Catalog = ({ children }) => {
  return <div className={styles.catalog}>{children}</div>;
};

export default Catalog;
