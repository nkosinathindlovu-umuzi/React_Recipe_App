import PropTypes from "prop-types";
import Button from "../UI/Button.jsx";
import styles from "./Recipe.module.css";

const categories = ["all", "breakfast", "lunch", "dinner", "dessert", "snack"];
const difficulties = ["all", "easy", "medium", "hard"];

// Filter controls for RecipesPage. Every select is a controlled input whose
// value/onChange live in the parent — this component holds no state.
const RecipeFilter = ({
  category,
  cuisine,
  difficulty,
  cuisineOptions,
  onCategoryChange,
  onCuisineChange,
  onDifficultyChange,
  onClear,
}) => {
  return (
    <div className={styles.filterBar}>
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "All Categories" : c[0].toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      <select value={cuisine} onChange={(e) => onCuisineChange(e.target.value)}>
        <option value="all">All Cuisines</option>
        {cuisineOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select value={difficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
        {difficulties.map((d) => (
          <option key={d} value={d}>
            {d === "all" ? "All Difficulties" : d[0].toUpperCase() + d.slice(1)}
          </option>
        ))}
      </select>

      <Button variant="secondary" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  );
};

RecipeFilter.propTypes = {
  category: PropTypes.string.isRequired,
  cuisine: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  cuisineOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onCuisineChange: PropTypes.func.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default RecipeFilter;
