import React from "react";
import Link from "next/link";
import styles from "./LessonDisplays.module.css";
import Tags from "../../shared_components/Tags";

// A card/thumbnail for an individual lesson that takes in
// a lesson and whether or not a learner has completed it.
// A completed lesson is styled differently.
const LessonLearnerThumb = ({ lesson, complete }) => {
  return (
    <div
      className={
        complete ? styles.completeLessonThumb : styles.incompleteLessonThumb
      }
    >
      <h3 className={styles.thumbnailHeading}>{lesson.title}</h3>
      <p className={styles.thumbnailAuthor}>By {lesson.creator.username}</p>

      <Link
        className={styles.thumbnailButton}
        href={`/learner_dashboard/${lesson._id}`}
      >
        View lesson
      </Link>
      <Tags tagArray={lesson.tags} />
    </div>
  );
};

export default LessonLearnerThumb;
