import PropTypes from "prop-types";
import Card from "../UI/Card.jsx";
import { capitalize } from "../../utils/helpers.js";
import styles from "./MealPlanner.module.css";

const mealSlots = ["breakfast", "lunch", "dinner"];

// Represents one day of the week. MealPlanner renders this 7 times (Mon–Sun),
// which is where the "reusable component used 5+ times" requirement is easiest to see.
const DayCard = ({ day, meals, onRemoveMeal }) => {
  return (
    <Card>
      <h4>{capitalize(day)}</h4>
      {mealSlots.map((slot) => (
        <div key={slot} className={styles.slot}>
          <span className={styles.slotLabel}>{capitalize(slot)}</span>
          {/* Ternary: filled slot shows the recipe + remove button, empty slot shows a hint */}
          {meals && meals[slot] ? (
            <div className={styles.slotFilled}>
              <span>{meals[slot].title}</span>
              <button
                className={styles.removeBtn}
                onClick={() => onRemoveMeal(day, slot)}
                aria-label={`Remove ${meals[slot].title} from ${slot}`}
              >
                ✕
              </button>
            </div>
          ) : (
            <span className={styles.slotEmpty}>— empty —</span>
          )}
        </div>
      ))}
    </Card>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.object,
  onRemoveMeal: PropTypes.func.isRequired,
};

DayCard.defaultProps = {
  meals: {},
};

export default DayCard;
