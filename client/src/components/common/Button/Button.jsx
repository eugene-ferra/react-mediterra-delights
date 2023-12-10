import styles from "./Button.module.scss";

const Button = ({ className, type, disabled, children }) => {
  let classValue;
  switch (type) {
    case "primary":
      classValue = styles.button;
      break;

    default:
      classValue = styles.button;
  }

  return (
    <button className={`${classValue} ${className || ""}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
