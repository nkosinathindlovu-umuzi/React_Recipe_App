import PropTypes from "prop-types";
import RecipeList from "../components/Recipe/RecipeList.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import styles from "./Pages.module.css";

const FavoritesPage = ({ favorites, onFavoriteToggle }) => {
  return (
    <div className={styles.page}>
      <h1>Your Favorites</h1>
      {/* Conditional rendering: whole section swaps based on favorites.length */}
      {favorites.length > 0 ? (
        <RecipeList recipes={favorites} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
      ) : (
        <EmptyState message="No favorites yet. Browse recipes and tap the heart to save one here." />
      )}
    </div>
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default FavoritesPage;
