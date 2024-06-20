import styles from "./Loader.module.scss";

const Loader = ({ type }) => {
  let classType;

  switch (type) {
    case "default":
      classType = styles.loaderBody;
      break;
    case "small":
      classType = styles.loaderBodySmall;
      break;
    case "accent":
      classType = styles.loaderBodyAccent;
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
