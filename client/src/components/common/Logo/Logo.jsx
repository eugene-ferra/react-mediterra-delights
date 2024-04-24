import { Link } from "react-router-dom";
import Picture from "../Picture/Picture";
import logoImg from "../../../assets/logo.svg";
import styles from "./Logo.module.scss";

const Logo = ({ className }) => {
  return (
    <Link className={`${styles.logo} ${className || ""}`} to={"/"}>
      <Picture formats={{ jpg: logoImg }} alt={"mediterra delights"} />
    </Link>
  );
};

export default Logo;
