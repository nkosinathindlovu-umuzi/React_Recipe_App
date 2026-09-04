# Midlands Table — Planning Document

## Component Hierarchy

```
App
├── Navbar                          (common)
├── Routes
│   ├── Home
│   │   ├── AudioPlayer             (Media) — cooking tips audio
│   │   └── RecipeCard × 3          (Recipe) — "todays picks"
│   ├── RecipesPage
│   │   ├── SearchBar               (UI)
│   │   ├── RecipeFilter            (Recipe)
│   │   └── RecipeList              (Recipe)
│   │       └── RecipeCard × n      (Recipe)
│   │           └── Button          (UI)
│   ├── RecipeDetail                (Recipe)  [dynamic route /recipes/:id]
│   │   ├── VideoPlayer             (Media)
│   │   ├── Button                  (UI) × 2 (favorite, add-to-planner)
│   │   └── Modal                   (UI) — day/meal picker
│   │       └── Button              (UI)
│   ├── MealPlannerPage
│   │   └── MealPlanner             (MealPlanner)
│   │       └── DayCard × 7         (MealPlanner) — reused Mon–Sun
│   │           └── Card            (UI)
│   ├── FavoritesPage
│   │   ├── RecipeList              (Recipe) (conditional)
│   │   └── EmptyState              (common) (conditional)
│   └── NotFound
├── Footer                          (common)
```

This gives 3+ levels of nesting: App → RecipesPage → RecipeList → RecipeCard → Button.

## Data Flow Diagram

```
App.jsx (top-level state: recipes, favorites, mealPlan, searchTerm, category)
   │
   ├── favorites, onFavoriteToggle ──────► RecipesPage ──► RecipeList ──► RecipeCard
   ├── favorites ─────────────────────────► FavoritesPage ──► RecipeList ──► RecipeCard
   ├── mealPlan, onAddMeal, onRemoveMeal ─► MealPlannerPage ──► MealPlanner ──► DayCard
   └── recipes, searchTerm, category ────► RecipesPage ──► RecipeFilter / SearchBar (callbacks up)
```

- **Favorites** and **meal plan** live in `App.jsx` (lifted state) — RecipesPage,
  RecipeDetail, FavoritesPage and MealPlannerPage all need to read/change them.
- **Sibling communication**: RecipesPage and FavoritesPage both read/write the same
  `favorites` state in `App.jsx`, so favoriting on one page updates the other instantly.
- **Search/filter state** stays local to RecipesPage since nothing else needs it.

## Components To Be Created

| Component | Folder | Purpose |
|---|---|---|
| Navbar | Navigation | Route links, active styling, mobile menu |
| Button | UI | Reusable, variant prop (primary/secondary/danger) |
| Card | UI | Generic container, children prop |
| SearchBar | UI | Controlled search input |
| Loading | UI | Spinner during data load |
| Modal | UI | Reusable overlay, children prop |
| RecipeCard | Recipe | Recipe summary + actions |
| RecipeList | Recipe | Maps recipes to RecipeCards |
| RecipeDetail | Recipe | Full view: video, ingredients, steps |
| RecipeFilter | Recipe | Category/cuisine/difficulty filters |
| MealPlanner | MealPlanner | Container for 7 DayCards |
| DayCard | MealPlanner | One day, 3 meal slots, reused 7× |
| VideoPlayer | Media | HTML5 video with fallback |
| AudioPlayer | Media | HTML5 audio with fallback |
| Header/Footer | common | Site chrome |
| EmptyState | common | Reused empty-state message |
| Home, RecipesPage, MealPlannerPage, FavoritesPage, NotFound | pages | Route screens |

## Props Flow (examples)

- App → RecipesPage: `recipes`, `favorites`, `onFavoriteToggle`, `onAddMeal`
- RecipesPage → RecipeList: filtered `recipes` (transformed data), `favorites`
- RecipeList → RecipeCard: single `recipe`, computed `isFavorite`, `onFavoriteToggle`
- RecipeCard → Button: `variant`, `onClick`, `children`

## State Management Strategy

- `useState` in `App.jsx`: `recipes`, `favorites` (array), `mealPlan` (object keyed by day),
  `isLoading`, `error`.
- `useState` locally in `RecipesPage`: `searchTerm`, `category`, `cuisine`, `difficulty`.
- `useEffect` #1: load `recipesData` into state on mount (short delay to show a real
  loading state). `useEffect` #2: read `favorites`/`mealPlan` from `localStorage` on mount.
  `useEffect` #3: write them back to `localStorage` on change.
- Favorites and meal plan are complex state (array/object), updated immutably with spread
  syntax (`[...favorites, recipe]`, `{...mealPlan, monday: {...}}`).
