import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard.jsx";
import EmptyState from "../common/EmptyState.jsx";
import styles from "./Recipe.module.css";

// Renders an array of RecipeCards. Kept dumb on purpose: it just maps and
// forwards callbacks, so RecipesPage/FavoritesPage/Home can all reuse it.
const RecipeList = ({ recipes, favorites, onFavoriteToggle }) => {
  // Conditional rendering: empty state when there's nothing to show
  if (recipes.length === 0) {
    return <EmptyState message="No recipes found. Try a different search or filter." />;
  }

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.some((fav) => fav.id === recipe.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func,
};

RecipeList.defaultProps = {
  favorites: [],
  onFavoriteToggle: () => {},
};

export default RecipeList;
