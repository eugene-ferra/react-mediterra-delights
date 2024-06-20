import styles from "./Modal.module.scss";

const Modal = ({
  isOpen,
  onClose,
  children,
  align = "flex-start",
  gap = "15px",
  className,
  isLoading,
}) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={isOpen ? styles.overlay : styles.overlayHidden}
      onClick={!isLoading && onClose}
    >
      {isOpen && (
        <div
          className={`${styles.content} ${className || ""}`}
          onClick={handleContentClick}
        >
          <button
            onClick={!isLoading && onClose}
            className={styles.close}
            title="Закрити"
          >
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
