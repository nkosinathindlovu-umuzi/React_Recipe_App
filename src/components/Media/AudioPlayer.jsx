import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../UI/Button.jsx";
import styles from "./Media.module.css";

// Cooking tips audio guide, e.g. "how to season a potjie" — plays on the Home page.
const AudioPlayer = ({ audioUrl, title }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      >
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support embedded audio. You can{" "}
        <a href={audioUrl}>download the audio guide</a> instead.
      </audio>
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
