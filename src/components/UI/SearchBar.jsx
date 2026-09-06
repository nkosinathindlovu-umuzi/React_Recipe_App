import PropTypes from "prop-types";
import styles from "./UI.module.css";

// Controlled search input. Value and change handler both come from the
// parent (RecipesPage) — this component holds no state of its own.
const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className={styles.searchBar}
      value={value}
      // Event object accessed directly: e.target.value
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search recipes"
    />
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: "Search recipes…",
};

export default SearchBar;
