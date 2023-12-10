import styles from "./Title.module.scss";

const Title = ({ children, className }) => {
  return <h2 className={`${styles.title} ${className || ""}`}>{children}</h2>;
};

export default Title;
