// Reading and writing the saved favourites and meal plan in localStorage.
// Kept in one place so App.jsx can read everything BEFORE the first render
// (in its useState initialisers), instead of reading it later in an effect.

import { daysOfWeek } from "./helpers.js";

// Builds an empty week: { monday: {}, tuesday: {}, ... }
export const emptyWeek = () => Object.fromEntries(daysOfWeek.map((day) => [day, {}]));

// Reads one saved value. If it is missing we use the fallback.
// If it is there but broken (not JSON, or the wrong shape), we also use the
// fallback, but we report the problem so the app can tell the user.
const readSaved = (key, fallback, isValid) => {
  try {
    const text = localStorage.getItem(key);
    if (text === null) return { value: fallback, broken: false };

    const value = JSON.parse(text);
    if (!isValid(value)) return { value: fallback, broken: true };
    return { value, broken: false };
  } catch {
    // JSON.parse failed, or the browser blocked localStorage (e.g. strict privacy mode)
    return { value: fallback, broken: true };
  }
};

const isFavoritesList = (value) => Array.isArray(value) && value.every((item) => item && typeof item.id === "number");

const isMealPlan = (value) =>
  value !== null && typeof value === "object" && daysOfWeek.every((day) => typeof value[day] === "object");

// Everything App needs when it starts: the saved data and a message if something was wrong.
export const loadSavedData = () => {
  const favorites = readSaved("favorites", [], isFavoritesList);
  const mealPlan = readSaved("mealPlan", emptyWeek(), isMealPlan);

  const brokenParts = [];
  if (favorites.broken) brokenParts.push("favourites");
  if (mealPlan.broken) brokenParts.push("meal plan");

  return {
    favorites: favorites.value,
    mealPlan: mealPlan.value,
    problem:
      brokenParts.length > 0
        ? `We couldn't read your saved ${brokenParts.join(" and ")}, so we started fresh.`
        : "",
  };
};

// Saves a value. If the browser refuses (storage full or blocked) we catch the
// error so the app keeps working; the data just stays in memory for this visit.
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Could not save ${key} in localStorage.`);
  }
};
