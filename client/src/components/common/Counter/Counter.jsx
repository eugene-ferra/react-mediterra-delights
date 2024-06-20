import styles from "./Counter.module.scss";

const Counter = ({ onMinus, onPlus, label, disabled }) => {
  return (
    <div className={styles.counter}>
      <button className={styles.btn} onClick={onMinus} disabled={disabled}>
        -
      </button>
      <p className={styles.count}>{label}</p>
      <button className={styles.btn} onClick={onPlus} disabled={disabled}>
        +
      </button>
    </div>
  );
};

export default Counter;
