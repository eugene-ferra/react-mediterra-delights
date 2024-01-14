import styles from "./Title.module.scss";

const Title = ({ children, className, align, type }) => {
  let classType;

  switch (type) {
    case "small":
      classType = styles.titleSmall;
      break;
    case "global":
      classType = styles.titleGlobal;
      break;
    default:
      classType = styles.title;
  }

  return (
    <h2
      className={`${classType} ${className || ""}`}
      style={{ textAlign: align || "left" }}
    >
      {children}
    </h2>
  );
};

export default Title;
