import styles from "./Loader.module.scss";

const Loader = ({ type }) => {
  let classType;

  switch (type) {
    case "default":
      classType = styles.loaderBody;
      break;
    case "global":
      classType = styles.loaderBodyGlobal;
      break;

    default:
      classType = styles.loaderBody;
  }

  return (
    <div className={styles.loader}>
      <div className={classType}>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
