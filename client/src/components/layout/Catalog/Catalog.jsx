import styles from "./Catalog.module.scss";

const Catalog = ({ children, type }) => {
  let classType;

  switch (type) {
    case "small":
      classType = styles.catalogSmall;
      break;
    case "full":
      classType = styles.catalogFull;
      break;
    case "no-items":
      classType = styles.catalogNoItems;
      break;

    default:
      classType = styles.catalog;
  }

  return <div className={classType}>{children}</div>;
};

export default Catalog;
