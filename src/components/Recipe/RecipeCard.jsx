import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../UI/Button.jsx";
import Card from "../UI/Card.jsx";
import { formatCookTime, difficultyEmoji } from "../../utils/helpers.js";
import styles from "./Recipe.module.css";

// Recipe summary shown in RecipeList, Home's "today's picks", and FavoritesPage.
// This is one of our 5+ reusable components — used in at least three contexts.
const RecipeCard = ({ recipe, isFavorite, onFavoriteToggle }) => {
  return (
    <Card>
      <div className={styles.cardImageWrap}>
        <img src={recipe.image} alt={recipe.title} className={styles.cardImage} />
        {/* Expression as prop + conditional styling: favorite class only when isFavorite */}
        <button
          className={isFavorite ? `${styles.favoriteBtn} ${styles.favoriteActive}` : styles.favoriteBtn}
          onClick={() => onFavoriteToggle(recipe)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          ❤
        </button>
      </div>

      <h3>{recipe.title}</h3>
      <p className={styles.meta}>
        {/* Function called within JSX for data transformation */}
        Cook time: {formatCookTime(recipe.cookTime)} · Serves {recipe.servings || 4} ·{" "}
        {difficultyEmoji(recipe.difficulty)} {recipe.difficulty}
      </p>

      <Link to={`/recipes/${recipe.id}`}>
        <Button variant="secondary">View Recipe</Button>
      </Link>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    cookTime: PropTypes.number,
    servings: PropTypes.number,
    difficulty: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
};

RecipeCard.defaultProps = {
  isFavorite: false,
  onFavoriteToggle: () => {},
};

export default RecipeCard;
