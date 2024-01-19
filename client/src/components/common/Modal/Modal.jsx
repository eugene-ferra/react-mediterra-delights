import styles from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, children }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={isOpen ? styles.overlay : styles.overlayHidden} onClick={onClose}>
      {isOpen && (
        <div className={styles.content} onClick={handleContentClick}>
          <button onClick={onClose} className={styles.close}>
            &times;
          </button>
          <div className={styles.children}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Modal;
