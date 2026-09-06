import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/recipes", label: "Recipes" },
  { to: "/meal-planner", label: "Meal Planner" },
  { to: "/favorites", label: "Favorites" },
];

const Navbar = ({ favoritesCount }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand} onClick={() => setIsOpen(false)}>
          Midlands Table
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>

        {/* Conditional styling: open class only applied when isOpen is true */}
        <div className={isOpen ? `${styles.links} ${styles.linksOpen}` : styles.links}>
          {links.map((link) => {
            // Home needs an exact match; others match on "starts with"
            const isActive =
              link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to);

            return (
              <Link
                key={link.to}
                to={link.to}
                className={isActive ? `${styles.link} ${styles.active}` : styles.link}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                {link.to === "/favorites" && favoritesCount > 0 && (
                  <span className={styles.badge}>{favoritesCount}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  favoritesCount: PropTypes.number,
};

Navbar.defaultProps = {
  favoritesCount: 0,
};

export default Navbar;
