import Loader from "../../common/Loader/Loader";
import styles from "./PageLoader.module.scss";

const PageLoader = () => {
  return (
    <div className={styles.inner}>
      <Loader type={"global"} />
    </div>
  );
};

export default PageLoader;
