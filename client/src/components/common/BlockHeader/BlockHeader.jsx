import { Link } from "react-router-dom";
import Title from "../Title/Title";
import styles from "./BlockHeader.module.scss";
import NextIcon from "../../svg/NextIcon";

const BlockHeader = ({ title, linkText, to }) => {
  return (
    <div className={styles.blockHeader}>
      <Title>{title}</Title>
      {linkText && to && (
        <Link to={to} className={styles.link}>
          {linkText}
          <NextIcon />
        </Link>
      )}
    </div>
  );
};

export default BlockHeader;
