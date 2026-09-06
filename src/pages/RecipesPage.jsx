import { useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "../components/UI/SearchBar.jsx";
import RecipeFilter from "../components/Recipe/RecipeFilter.jsx";
import RecipeList from "../components/Recipe/RecipeList.jsx";
import { filterRecipes } from "../utils/helpers.js";
import styles from "./Pages.module.css";

const RecipesPage = ({ recipes, favorites, onFavoriteToggle }) => {
  // Local state: search/filter values only matter to this page
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [cuisine, setCuisine] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  // Derived list of cuisines present in the data, for the filter dropdown
  const cuisineOptions = [...new Set(recipes.map((r) => r.cuisine))];

  // Function called within JSX for data transformation (filtering)
  const filteredRecipes = filterRecipes(recipes, { searchTerm, category, cuisine, difficulty });

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setCuisine("all");
    setDifficulty("all");
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
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </form>

      <RecipeFilter
        category={category}
        cuisine={cuisine}
        difficulty={difficulty}
        cuisineOptions={cuisineOptions}
        onCategoryChange={setCategory}
        onCuisineChange={setCuisine}
        onDifficultyChange={setDifficulty}
        onClear={handleClearFilters}
      />

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
