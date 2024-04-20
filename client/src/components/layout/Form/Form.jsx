import styles from "./Form.module.scss";

const Form = ({ children, className, style, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${styles.form} ${className || ""}`}
      style={style}
    >
      {children}
    </form>
  );
};

export default Form;
