import styles from "./Char.module.scss";

const Char = ({ name, value }) => {
  return (
    <div className={styles.char}>
      <span>{name}</span>
      <span>{value}</span>
    </div>
  );
};

export default Char;
