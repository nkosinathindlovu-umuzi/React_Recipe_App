import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import VideoPlayer from "../Media/VideoPlayer.jsx";
import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";
import { daysOfWeek, capitalize, formatCookTime, difficultyEmoji } from "../../utils/helpers.js";
import styles from "./Recipe.module.css";

const meals = ["breakfast", "lunch", "dinner"];

// Full recipe page, reached via the dynamic route /recipes/:id.
const RecipeDetail = ({ recipes, favorites, onFavoriteToggle, onAddMeal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [selectedMeal, setSelectedMeal] = useState(meals[0]);

  const recipe = recipes.find((r) => r.id === parseInt(id));
  const isFavorite = recipe ? favorites.some((f) => f.id === recipe.id) : false;

  // Conditional rendering: whole section renders differently when the id doesn't match
  if (!recipe) {
    return (
      <div className={styles.notFoundInline}>
        <p>We couldn't find that recipe.</p>
        <Button onClick={() => navigate("/recipes")}>Back to Recipes</Button>
      </div>
    );
  }

  const handleConfirmAddMeal = (e) => {
    e.preventDefault();
    onAddMeal(selectedDay, selectedMeal, recipe);
    setShowModal(false);
  };

  return (
    <div className={styles.detailPage}>
      <Button variant="secondary" onClick={() => navigate("/recipes")}>
        ← Back to Recipes
      </Button>

      <div className={styles.detailHeader}>
        <img src={recipe.image} alt={recipe.title} className={styles.detailImage} />
        <div>
          <h1>{recipe.title}</h1>
          <p className={styles.meta}>
            {recipe.cuisine} · {formatCookTime(recipe.cookTime)} · Serves {recipe.servings || 4} ·{" "}
            {difficultyEmoji(recipe.difficulty)} {recipe.difficulty}
          </p>
          <div className={styles.detailActions}>
            <Button
              variant={isFavorite ? "danger" : "primary"}
              onClick={() => onFavoriteToggle(recipe)}
            >
              {isFavorite ? "Remove Favorite" : "❤ Favorite"}
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(true)}>
              Add to Meal Plan
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.detailBody}>
        <section>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      <VideoPlayer videoUrl={recipe.videoUrl} title={`${recipe.title} — cooking tutorial`} />

      {/* Conditional section: modal only mounted while showModal is true */}
      {showModal && (
        <Modal title="Add to meal plan" onClose={() => setShowModal(false)}>
          <form onSubmit={handleConfirmAddMeal} className={styles.modalForm}>
            <label>
              Day
              <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {capitalize(day)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Meal
              <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
                {meals.map((meal) => (
                  <option key={meal} value={meal}>
                    {capitalize(meal)}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit">Add</Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

RecipeDetail.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  onAddMeal: PropTypes.func.isRequired,
};

export default RecipeDetail;
