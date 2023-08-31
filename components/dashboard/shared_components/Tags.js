import React from "react";
import styles from "./SharedComponents.module.css";
// A component that takes in an array of tags and displays them neatly.
const Tags = ({ tagArray = [] }) => {
  return (
    <div className={styles.tagContainer}>
      {tagArray.map((tag, index) => {
        return (
          <div className={styles.tag} key={index}>
            {tag}
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
