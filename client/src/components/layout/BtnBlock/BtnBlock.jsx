import styles from "./BtnBlock.module.scss";

const BtnBlock = ({ children }) => {
  return <div className={styles.btnBlock}>{children}</div>;
};

export default BtnBlock;
