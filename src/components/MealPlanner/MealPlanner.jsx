import PropTypes from "prop-types";
import DayCard from "./DayCard.jsx";
import Button from "../UI/Button.jsx";
import { daysOfWeek } from "../../utils/helpers.js";
import styles from "./MealPlanner.module.css";

const MealPlanner = ({ mealPlan, onRemoveMeal, onClearWeek }) => {
  return (
    <div>
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
