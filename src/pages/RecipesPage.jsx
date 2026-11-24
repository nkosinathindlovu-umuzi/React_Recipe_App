import { useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "../components/UI/SearchBar.jsx";
import RecipeFilter from "../components/Recipe/RecipeFilter.jsx";
import RecipeList from "../components/Recipe/RecipeList.jsx";
import { filterRecipes } from "../utils/helpers.js";
import styles from "./Pages.module.css";

// What the filters look like before the person changes anything
const startingFilters = { searchTerm: "", category: "all", cuisine: "all", difficulty: "all" };

const RecipesPage = ({ recipes, favorites, onFavoriteToggle }) => {
  // Complex state: all four search/filter values live together in ONE object.
  // They only matter to this page, so they stay here instead of in App.
  const [filters, setFilters] = useState(startingFilters);

  // Updates one field of the object and keeps the others (spread, never mutate)
  const updateFilter = (name, value) => {
    setFilters((previous) => ({ ...previous, [name]: value }));
  };

  // Derived list of cuisines present in the data, for the filter dropdown
  const cuisineOptions = [...new Set(recipes.map((r) => r.cuisine))];

  // Function called within JSX for data transformation (filtering)
  const filteredRecipes = filterRecipes(recipes, filters);

  // true when the person has typed a search or picked any filter
  const hasActiveFilters =
    filters.searchTerm !== "" || filters.category !== "all" || filters.cuisine !== "all" || filters.difficulty !== "all";

  const handleClearFilters = () => {
    setFilters(startingFilters);
  };

  // Form submit handler: pressing Enter in the search box submits rather than
  // reloading the page. Search already updates live via onChange too.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.page}>
      <h1>All Recipes</h1>

      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <SearchBar value={filters.searchTerm} onChange={(value) => updateFilter("searchTerm", value)} />
      </form>

      <RecipeFilter
        category={filters.category}
        cuisine={filters.cuisine}
        difficulty={filters.difficulty}
        cuisineOptions={cuisineOptions}
        onCategoryChange={(value) => updateFilter("category", value)}
        onCuisineChange={(value) => updateFilter("cuisine", value)}
        onDifficultyChange={(value) => updateFilter("difficulty", value)}
        onClear={handleClearFilters}
      />

      {/* Conditional section with &&: only shows while a search or filter is active */}
      {hasActiveFilters && (
        <p className={styles.resultSummary} role="status">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      )}

      <RecipeList recipes={filteredRecipes} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
    </div>
  );
};

RecipesPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default RecipesPage;
