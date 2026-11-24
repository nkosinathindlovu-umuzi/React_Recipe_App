// Loads the recipe "database". It works like a real fetch: it gives back a
// Promise, waits a moment, and checks the data before handing it over.
// If the data is missing or a recipe is incomplete, the Promise rejects
// and App shows an error message with a "Try again" button.

import { recipesData } from "../data/recipesData.js";

const isCompleteRecipe = (recipe) =>
  typeof recipe.id === "number" &&
  typeof recipe.title === "string" &&
  Array.isArray(recipe.ingredients) &&
  Array.isArray(recipe.instructions);

export const loadRecipes = (data = recipesData, delay = 400) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Array.isArray(data) || data.length === 0) {
        reject(new Error("There are no recipes to show right now."));
        return;
      }

      const broken = data.find((recipe) => !isCompleteRecipe(recipe));
      if (broken) {
        reject(new Error(`The recipe "${broken.title || "with no name"}" is missing some details.`));
        return;
      }

      resolve(data);
    }, delay);
  });
