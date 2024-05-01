import styles from "./Modal.module.scss";

const Modal = ({
  isOpen,
  onClose,
  children,
  align = "flex-start",
  gap = "15px",
  className,
}) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={isOpen ? styles.overlay : styles.overlayHidden} onClick={onClose}>
      {isOpen && (
        <div
          className={`${styles.content} ${className || ""}`}
          onClick={handleContentClick}
        >
          <button onClick={onClose} className={styles.close} title="Закрити">
            &times;
          </button>
          <div className={styles.children} style={{ alignItems: align, gap: gap }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
