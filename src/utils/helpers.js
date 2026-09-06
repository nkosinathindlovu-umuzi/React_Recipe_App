// Small transformation helpers, called from inside JSX rather than storing
// derived values in state (keeps state minimal and avoids sync bugs).

// Turns raw minutes into a readable string, e.g. 90 -> "1h 30m".
// Biltong's 4320 minutes (3 days) becomes "3d" so the UI stays sane.
export function formatCookTime(minutes) {
  if (minutes >= 1440) {
    const days = Math.round(minutes / 1440);
    return `${days}d`;
  }
  if (minutes >= 60) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  }
  return `${minutes}m`;
}

// Applies search term + category/cuisine/difficulty filters to a recipe list.
export function filterRecipes(recipes, { searchTerm, category, cuisine, difficulty }) {
  return recipes
    .filter((r) =>
      searchTerm ? r.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
    )
    .filter((r) => (category && category !== "all" ? r.category === category : true))
    .filter((r) => (cuisine && cuisine !== "all" ? r.cuisine === cuisine : true))
    .filter((r) => (difficulty && difficulty !== "all" ? r.difficulty === difficulty : true));
}

// Difficulty badge colour, used for conditional styling.
export function difficultyEmoji(difficulty) {
  if (difficulty === "easy") return "🟢";
  if (difficulty === "medium") return "🟡";
  return "🔴";
}

// The seven days the meal planner works across, in order.
export const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// Capitalises a day key for display: "monday" -> "Monday".
export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
