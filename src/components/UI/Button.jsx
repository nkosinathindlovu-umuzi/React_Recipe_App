import PropTypes from "prop-types";
import styles from "./UI.module.css";

// Reusable button. `variant` picks the color treatment; `children` lets the
// caller pass any label/icon content in (composition pattern).
const Button = ({ variant, onClick, type, children, disabled }) => {
  // Conditional styling: combine the base class with a variant-specific class
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit"]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

// Default values for optional props
Button.defaultProps = {
  variant: "primary",
  type: "button",
  disabled: false,
};

export default Button;
