import PropTypes from "prop-types";
import AudioPlayer from "../components/Media/AudioPlayer.jsx";
import RecipeCard from "../components/Recipe/RecipeCard.jsx";
import styles from "./Pages.module.css";

// Landing page: intro, one audio cooking tip, and 3 featured recipes.
const Home = ({ recipes, favorites, onFavoriteToggle }) => {
  // Data transformation before passing to children: take the first 3 recipes
  const featured = recipes.slice(0, 3);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>Midlands Table</h1>
        <p>
          Recipes from Pietermaritzburg's kitchens to yours — browse dishes, plan your
          week, and learn technique from real cooking tutorials.
        </p>
      </section>

      <AudioPlayer
        audioUrl="/assets/audio/seasoning-tips.mp3"
        title="Cooking Tip: Building Flavour with Curry Leaves"
      />

      <h2>Today's Picks</h2>
      <div className={styles.grid}>
        {featured.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.some((f) => f.id === recipe.id)}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default Home;
