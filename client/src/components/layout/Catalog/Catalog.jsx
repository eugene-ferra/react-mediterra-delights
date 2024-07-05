import styles from "./Catalog.module.scss";

const Catalog = ({ children, type, style }) => {
  let classType;

  switch (type) {
    case "small":
      classType = styles.catalogSmall;
      break;
    case "tiny":
      classType = styles.catalogTiny;
      break;
    case "no-items":
      classType = styles.catalogNoItems;
      break;

    default:
      classType = styles.catalog;
  }

  return (
    <div className={classType} style={style}>
      {children}
    </div>
  );
};

export default Catalog;
