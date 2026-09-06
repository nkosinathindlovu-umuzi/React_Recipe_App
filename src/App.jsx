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
import { recipesData } from "./data/recipesData.js";
import { daysOfWeek } from "./utils/helpers.js";
import "./App.css";

// Builds an empty week: { monday: {}, tuesday: {}, ... }
const emptyWeek = () => Object.fromEntries(daysOfWeek.map((day) => [day, {}]));

function App() {
  // Top-level state — lifted up because multiple pages need to read/change it
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mealPlan, setMealPlan] = useState(emptyWeek());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect #1: load recipe data on mount (simulated fetch delay so the
  // Loading state is genuinely visible, not just a flash)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setRecipes(recipesData);
        setIsLoading(false);
      } catch {
        setError("Could not load recipes.");
        setIsLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // useEffect #2: read favorites + meal plan from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedMealPlan = localStorage.getItem("mealPlan");
    if (savedMealPlan) setMealPlan(JSON.parse(savedMealPlan));
  }, []);

  // useEffect #3: persist favorites whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // useEffect #4 (bonus, beyond the 3 minimum): persist meal plan too
  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

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
        {/* Conditional rendering: loading / error / content states */}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p role="alert">{error}</p>
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
