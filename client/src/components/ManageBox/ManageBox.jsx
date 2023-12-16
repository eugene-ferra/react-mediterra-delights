import { Outlet } from "react-router-dom";
import styles from "./ManageBox.module.scss";
const ManageBox = () => {
  return (
    <div className={styles.manageBox}>
      <Outlet />
    </div>
  );
};

export default ManageBox;
