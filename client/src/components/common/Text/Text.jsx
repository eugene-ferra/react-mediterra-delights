import styles from "./Text.module.scss";

const Text = ({ children, className, type, align, style }) => {
  let classValue;

  switch (type) {
    case "small":
      classValue = styles.textSmall;
      break;
    case "normal":
      classValue = styles.text;
      break;
    case "big":
      classValue = styles.textBig;
      break;
    case "error":
      classValue = styles.textError;
      break;
    default:
      classValue = styles.text;
  }

  return (
    <p
      className={`${classValue} ${className || ""}`}
      style={{ textAlign: align || "left", ...style }}
    >
      {children}
    </p>
  );
};

export default Text;
