import LessonView from "@/components/dashboard/learner_dashboard/lesson_view/LessonView";
import getLesson from "@/utilities/fetching_functions/getLesson";
import React from "react";

// This page shows a specific lesson. The lesson's ID is the dynamic route
// where you can find the lesson. It simply returns a lessonView component with
// props describing the lesson.
const LearnerLessonView = async ({ params }) => {
  const lesson = await getLesson("learner", params.lesson_id);
  return (
    <div className="lesson-container">
      <LessonView
        title={lesson.content?.title}
        tags={lesson.content?.tags}
        components={lesson.content?.lessonComponents}
        id={params.lesson_id}
      />
    </div>
  );
};

export default LearnerLessonView;
