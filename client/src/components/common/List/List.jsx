import Title from "../Title/Title";
import styles from "./List.module.scss";

const List = ({ children, title, className }) => {
  return (
    <div className={`${styles.inner} ${className || ""}`}>
      {title && <Title type={"small"}>{title}</Title>}
      <ul className={styles.list}>
        {children?.map((item, i) => (
          <li className={styles.item} key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
