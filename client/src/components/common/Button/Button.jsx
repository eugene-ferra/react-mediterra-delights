import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const Button = ({ className, type, asTag, to, disabled, children, onClick, style }) => {
  let classValue;

  switch (type) {
    case "primary":
      classValue = styles.button;
      break;
    case "back":
      classValue = styles.buttonBack;
      break;
    case "outline":
      classValue = styles.buttonOutline;
      break;
    case "outline-red":
      classValue = styles.buttonOutlineRed;
      break;
    case "small":
      classValue = styles.buttonSmall;
      break;
    case "success":
      classValue = styles.buttonSuccess;
      break;
    default:
      classValue = styles.button;
  }

  return (
    <>
      {asTag === "Link" ? (
        <Link
          to={to}
          className={`${classValue} ${className || ""}`}
          disabled={disabled}
          onClick={onClick}
          style={styles}
        >
          {children}
        </Link>
      ) : (
        <button
          className={`${classValue} ${className || ""}`}
          disabled={disabled}
          onClick={onClick}
          style={style}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
