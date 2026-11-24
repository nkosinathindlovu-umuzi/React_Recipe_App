import PropTypes from "prop-types";
import Card from "../UI/Card.jsx";
import { capitalize } from "../../utils/helpers.js";
import styles from "./MealPlanner.module.css";

const mealSlots = ["breakfast", "lunch", "dinner"];

// Represents one day of the week. MealPlanner renders this 7 times (Mon–Sun),
// which is where the "reusable component used 5+ times" requirement is easiest to see.
const DayCard = ({ day, meals = {}, onRemoveMeal }) => {
  // how many of the 3 meals are planned for this day
  const plannedCount = mealSlots.filter((slot) => meals && meals[slot]).length;
  const percent = Math.round((plannedCount / mealSlots.length) * 100);

  return (
    <Card highlighted={plannedCount === mealSlots.length}>
      <h4>{capitalize(day)}</h4>

      {/* Inline style #2: the bar width and colour come from how many meals are planned */}
      <div
        className={styles.dayProgress}
        role="progressbar"
        aria-label={`${capitalize(day)}: ${plannedCount} of 3 meals planned`}
        aria-valuenow={plannedCount}
        aria-valuemin={0}
        aria-valuemax={3}
      >
        <div
          className={styles.dayProgressFill}
          style={{
            width: `${percent}%`,
            backgroundColor: plannedCount === mealSlots.length ? "var(--color-secondary)" : "var(--color-primary)",
          }}
        />
      </div>

      {/* Conditional section with &&: only shows when all 3 meals are planned */}
      {plannedCount === mealSlots.length && <p className={styles.dayDone}>All meals planned ✓</p>}
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

export default DayCard;
