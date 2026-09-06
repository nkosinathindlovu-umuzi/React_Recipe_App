import PropTypes from "prop-types";
import styles from "./common.module.css";

// Reused wherever a list can legitimately be empty: no favorites, no search
// results, an empty meal-plan day.
const EmptyState = ({ message }) => {
  return (
    <div className={styles.emptyState}>
      <p>{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyState;
