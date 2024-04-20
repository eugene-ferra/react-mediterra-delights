import { Link } from "react-router-dom";
import Title from "../../common/Title/Title";
import NextIcon from "../../svg/NextIcon";
import styles from "./BlockHeader.module.scss";

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
