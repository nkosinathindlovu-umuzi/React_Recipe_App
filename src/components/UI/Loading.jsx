import styles from "./UI.module.css";

// Shown while recipes are "loading" (simulated fetch in App.jsx's useEffect).
const Loading = () => {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <p>Loading recipes…</p>
    </div>
  );
};

export default Loading;
