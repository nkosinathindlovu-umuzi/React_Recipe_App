import PropTypes from "prop-types";
import MealPlanner from "../components/MealPlanner/MealPlanner.jsx";
import styles from "./Pages.module.css";

const MealPlannerPage = ({ mealPlan, onRemoveMeal, onClearWeek }) => {
  return (
    <div className={styles.page}>
      <h1>Weekly Meal Planner</h1>
      <MealPlanner mealPlan={mealPlan} onRemoveMeal={onRemoveMeal} onClearWeek={onClearWeek} />
    </div>
  );
};

MealPlannerPage.propTypes = {
  mealPlan: PropTypes.object.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onClearWeek: PropTypes.func.isRequired,
};

export default MealPlannerPage;
