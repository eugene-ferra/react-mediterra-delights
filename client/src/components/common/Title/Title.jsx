import styles from "./Title.module.scss";

const Title = ({ children, className, align }) => {
  return (
    <h2
      className={`${styles.title} ${className || ""}`}
      style={{ textAlign: align || "left" }}
    >
      {children}
    </h2>
  );
};

export default Title;
