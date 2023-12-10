import styles from "./Form.module.scss";

const Form = ({ children, className, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={`${styles.form} ${className || ""}`}>
      {children}
    </form>
  );
};

export default Form;
