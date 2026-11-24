import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../UI/Button.jsx";
import styles from "./Media.module.css";

// Cooking tips audio guide, e.g. "how to season a potjie" — plays on the Home page.
const AudioPlayer = ({ audioUrl, title }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // how far through the tip we are, from 0 to 100
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = (e) => {
    const media = e.target;
    if (media.duration) setProgress((media.currentTime / media.duration) * 100);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <div className={styles.audioContainer}>
      <h4>{title}</h4>
      <audio
        ref={audioRef}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setProgress(100)}
      >
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support embedded audio. You can{" "}
        <a href={audioUrl}>download the audio guide</a> instead.
      </audio>
      {/* Inline style #4: the bar width follows the playing time (progress state) */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <Button variant="secondary" onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"} tip
      </Button>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AudioPlayer;
