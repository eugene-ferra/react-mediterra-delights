import styles from "./Catalog.module.scss";

const Catalog = ({ children, type }) => {
  let classType;

  switch (type) {
    case "small":
      classType = styles.catalogSmall;
      break;

    default:
      classType = styles.catalog;
  }

  return <div className={classType}>{children}</div>;
};

export default Catalog;
