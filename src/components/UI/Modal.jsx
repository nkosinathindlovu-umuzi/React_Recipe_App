import PropTypes from "prop-types";
import styles from "./UI.module.css";

// Reusable overlay. Whatever the caller passes as children is rendered
// inside the modal body — used for the "add to meal plan" day/meal picker.
const Modal = ({ title, onClose, children }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        // Stop the overlay's onClick from also firing when the modal body is clicked
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
