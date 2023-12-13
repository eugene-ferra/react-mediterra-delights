import styles from "./Burger.module.scss";

const Burger = ({ className, onClick, isOpen }) => {
  return (
    <button
      className={`${isOpen ? styles.burgerActive : styles.burger} ${className || ""}`}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default Burger;
