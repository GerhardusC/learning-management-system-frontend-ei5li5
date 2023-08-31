import React from "react";
import styles from "./LessonView.module.css";
// Displays an image of a certain URL.
// Not using built in Image or Link by next.js because
// this is an external image.
const ViewImage = ({ url = "/", caption = "" }) => {
  return (
    <div className={styles.imageContainer}>
      <a href={url} target="_blank">
        <img className={styles.imageDisplay} alt={caption} src={url} />
      </a>
      <p className={styles.imageCaption}>
        <b>Image:</b> {caption}
      </p>
    </div>
  );
};

export default ViewImage;
