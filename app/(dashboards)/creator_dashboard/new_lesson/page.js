import React from "react";
import styles from "../creatorDashboard.module.css";

import EditingForm from "@/components/dashboard/creator_dashboard/lesson_editing/EditingForm";
// This component provides an empty editing form for a user to create a new lesson.
const CreateNewLesson = () => {
  return (
    <div className={styles.editingFormContainer}>
      <h1 className={styles.pageDescriptionText}>Creating new lesson...</h1>
      <EditingForm />
    </div>
  );
};

export default CreateNewLesson;
