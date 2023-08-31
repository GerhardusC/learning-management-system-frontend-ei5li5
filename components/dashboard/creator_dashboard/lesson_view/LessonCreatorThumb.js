"use client";
import React from "react";
import deleteLesson from "@/utilities/fetching_functions/deleteLesson";
import { useRouter } from "next/navigation";
import styles from "../lesson_creation/ComponentForms.module.css";
import Tags from "../../shared_components/Tags";

// A simple card/thumbnail displaying info about a single lesson. This also provides buttons
// to edit and delete a lesson.
const LessonCreatorThumb = ({ lesson }) => {
  const router = useRouter();
  return (
    <div className={styles.creatorThumbnail}>
      <h3>{lesson.title}</h3>
      <Tags tagArray={lesson.tags} />
      <div className={styles.buttonContainer}>
        <button
          className={styles.editButton}
          onClick={() => {
            router.push(`creator_dashboard/${lesson._id}`);
          }}
        >
          Edit
        </button>
        <button
          className={styles.deleteButton}
          onClick={async () => {
            await deleteLesson(lesson._id);
            router.refresh();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default LessonCreatorThumb;
