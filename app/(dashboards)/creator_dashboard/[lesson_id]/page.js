import EditingForm from "@/components/dashboard/creator_dashboard/lesson_editing/EditingForm";
import getLesson from "@/utilities/fetching_functions/getLesson";
import React from "react";
import styles from "../creatorDashboard.module.css";

// This component allows a creator user to edit a lesson.
// It simply returns the editing form with initial props
// that match the current lesson in the dynamic search param.
const CreatorLessonView = async ({ params }) => {
  const lesson = await getLesson("creator", params.lesson_id);
  return (
    <div className={styles.editingFormContainer}>
      <h1 className={styles.pageDescriptionText}>Editing existing lesson...</h1>
      <EditingForm
        titleProp={lesson.content?.title}
        tagsProp={lesson.content?.tags}
        componentsProp={lesson.content?.lessonComponents}
        idProp={params.lesson_id}
      />
    </div>
  );
};

export default CreatorLessonView;
