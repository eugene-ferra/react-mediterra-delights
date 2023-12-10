import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderBody}>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
