import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button.jsx";
import styles from "./Pages.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>This page doesn't exist — maybe it wandered off to the spice market.</p>
      {/* Programmatic navigation, not a Link */}
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};

export default NotFound;
