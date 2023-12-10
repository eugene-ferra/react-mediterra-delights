import styles from "./Text.module.scss";

const Text = ({ children, className, type }) => {
  let classValue;

  switch (type) {
    case "small":
      classValue = styles.small;
      break;
    case "normal":
      classValue = styles.text;
      break;
    default:
      classValue = styles.text;
  }

  return <p className={`${classValue} ${className || ""}`}>{children}</p>;
};

export default Text;
