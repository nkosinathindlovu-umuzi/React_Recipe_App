import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../UI/Button.jsx";
import styles from "./Media.module.css";

// Embedded cooking tutorial video with working play/pause controls.
const VideoPlayer = ({ videoUrl, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support embedded video. You can{" "}
        <a href={videoUrl}>download the tutorial</a> instead.
      </video>
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
