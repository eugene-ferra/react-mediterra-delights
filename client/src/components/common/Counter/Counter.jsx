import styles from "./Counter.module.scss";

const Counter = ({ onMinus, onPlus, label }) => {
  return (
    <div className={styles.counter}>
      <button className={styles.btn} onClick={onMinus}>
        -
      </button>
      <p className={styles.count}>{label}</p>
      <button className={styles.btn} onClick={onPlus}>
        +
      </button>
    </div>
  );
};

export default Counter;
