import React from "react";
import styles from "./LessonView.module.css";
// A view of a video. We use only the video id, which can be found at the end of the video url.
const ViewVideo = ({ videoId, caption }) => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
      />
      <p>
        {/* A video also needs a caption. */}
        <b>Video: </b>
        {caption}
      </p>
    </div>
  );
};

export default ViewVideo;
