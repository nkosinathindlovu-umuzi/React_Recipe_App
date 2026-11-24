import PropTypes from "prop-types";
import DayCard from "./DayCard.jsx";
import Button from "../UI/Button.jsx";
import { daysOfWeek } from "../../utils/helpers.js";
import styles from "./MealPlanner.module.css";

const MealPlanner = ({ mealPlan, onRemoveMeal, onClearWeek }) => {
  // count every planned meal in the week (data transformation before rendering)
  const plannedCount = daysOfWeek.reduce((total, day) => total + Object.keys(mealPlan[day] || {}).length, 0);

  return (
    <div>
      {/* Conditional section with &&: only shows once at least one meal is planned */}
      {plannedCount > 0 && (
        <p className={styles.plannedSummary}>
          You have planned {plannedCount} of 21 meals this week.
        </p>
      )}

      <div className={styles.header}>
        <p>Plan your week, Monday to Sunday. Add meals from any recipe's page.</p>
        <Button variant="danger" onClick={onClearWeek}>
          Clear Week
        </Button>
      </div>

      <div className={styles.weekGrid}>
        {/* Map function rendering DayCard 7 times */}
        {daysOfWeek.map((day) => (
          <DayCard key={day} day={day} meals={mealPlan[day]} onRemoveMeal={onRemoveMeal} />
        ))}
      </div>
    </div>
  );
};

MealPlanner.propTypes = {
  mealPlan: PropTypes.object.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onClearWeek: PropTypes.func.isRequired,
};

export default MealPlanner;
