import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../UI/Button.jsx";
import styles from "./Media.module.css";

// Embedded cooking tutorial video with working play/pause controls.
const VideoPlayer = ({ videoUrl, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // how far through the tutorial we are, from 0 to 100
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = (e) => {
    const media = e.target;
    if (media.duration) setProgress((media.currentTime / media.duration) * 100);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  return (
    <div className={styles.videoContainer}>
      <h4>{title}</h4>
      <video
        ref={videoRef}
        className={styles.video}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setProgress(100)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support embedded video. You can{" "}
        <a href={videoUrl}>download the tutorial</a> instead.
      </video>
      {/* Inline style #3: the bar width follows the playing time (progress state) */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <Button variant="secondary" onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"} tutorial
      </Button>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VideoPlayer;
