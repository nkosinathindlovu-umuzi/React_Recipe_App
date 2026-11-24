import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import Loading from "./components/UI/Loading.jsx";
import Home from "./pages/Home.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import MealPlannerPage from "./pages/MealPlannerPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import RecipeDetail from "./components/Recipe/RecipeDetail.jsx";
import { loadRecipes } from "./utils/loadRecipes.js";
import { loadSavedData, saveToStorage, emptyWeek } from "./utils/storage.js";
import "./App.css";

// App is an arrow-function component, like every other component in the app.
const App = () => {
  // Read the saved favourites and meal plan ONCE, before the first render.
  // Doing it here (instead of in a useEffect) means the save effects below never
  // run with empty values first, so StrictMode can not wipe the saved data.
  const [startData] = useState(loadSavedData);

  // Top-level state, lifted up because several pages need to read/change it
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(startData.favorites);
  const [mealPlan, setMealPlan] = useState(startData.mealPlan);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storageMessage, setStorageMessage] = useState(startData.problem);
  // changing this number makes the load effect run again ("Try again" button)
  const [loadAttempt, setLoadAttempt] = useState(0);

  // useEffect #1: load the recipes. loadRecipes() can really fail (missing or
  // incomplete data), and then we show the error message instead of the pages.
  useEffect(() => {
    let cancelled = false;

    loadRecipes()
      .then((data) => {
        if (!cancelled) setRecipes(data);
      })
      .catch((loadError) => {
        if (!cancelled) setError(loadError.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    // if the component unmounts (or StrictMode re-runs the effect) we ignore the old result
    return () => {
      cancelled = true;
    };
  }, [loadAttempt]);

  // useEffect #2: save favourites whenever they change.
  // saveToStorage catches errors (storage full or blocked), so a failed save
  // can not crash the app.
  useEffect(() => {
    saveToStorage("favorites", favorites);
  }, [favorites]);

  // useEffect #3: save the meal plan whenever it changes
  useEffect(() => {
    saveToStorage("mealPlan", mealPlan);
  }, [mealPlan]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setLoadAttempt((attempt) => attempt + 1);
  };

  // Child-to-parent communication: RecipeCard/RecipeDetail call this via props
  const handleFavoriteToggle = (recipe) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === recipe.id)
        ? prev.filter((f) => f.id !== recipe.id) // remove
        : [...prev, recipe] // add
    );
  };

  const handleAddMeal = (day, meal, recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: recipe },
    }));
  };

  const handleRemoveMeal = (day, meal) => {
    setMealPlan((prev) => {
      const updatedDay = { ...prev[day] };
      delete updatedDay[meal];
      return { ...prev, [day]: updatedDay };
    });
  };

  const handleClearWeek = () => {
    setMealPlan(emptyWeek());
  };

  return (
    <BrowserRouter>
      <Navbar favoritesCount={favorites.length} />

      <main>
        {/* Conditional section with &&: only shows when saved data was broken or could not be saved */}
        {storageMessage && (
          <div className="storage-warning" role="alert">
            <p>{storageMessage}</p>
            <button type="button" onClick={() => setStorageMessage("")}>
              Dismiss
            </button>
          </div>
        )}

        {/* Conditional rendering: loading / error / content states */}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="load-error" role="alert">
            <h1>Sorry, the recipes could not load</h1>
            <p>{error}</p>
            <button type="button" onClick={handleRetry}>
              Try again
            </button>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Home recipes={recipes} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />
              }
            />
            <Route
              path="/recipes"
              element={
                <RecipesPage
                  recipes={recipes}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              }
            />
            <Route
              path="/recipes/:id"
              element={
                <RecipeDetail
                  recipes={recipes}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  onAddMeal={handleAddMeal}
                />
              }
            />
            <Route
              path="/meal-planner"
              element={
                <MealPlannerPage
                  mealPlan={mealPlan}
                  onRemoveMeal={handleRemoveMeal}
                  onClearWeek={handleClearWeek}
                />
              }
            />
            <Route
              path="/favorites"
              element={<FavoritesPage favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
