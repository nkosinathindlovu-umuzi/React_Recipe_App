import PropTypes from "prop-types";
import styles from "./UI.module.css";

// Generic container. Anything can be dropped inside via the children prop —
// used by RecipeCard, DayCard, and the meal-planner slots.
const Card = ({ children, highlighted }) => {
  return (
    <div className={highlighted ? `${styles.card} ${styles.cardHighlighted}` : styles.card}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  highlighted: PropTypes.bool,
};

Card.defaultProps = {
  highlighted: false,
};

export default Card;
