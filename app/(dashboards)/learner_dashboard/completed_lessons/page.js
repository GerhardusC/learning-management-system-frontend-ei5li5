import React from "react";
import getCompletedLessons from "@/utilities/fetching_functions/getCompletedLessons";
import LessonLearnerThumb from "@/components/dashboard/learner_dashboard/lesson_view/LessonLearnerThumb";

// This page displays all the completed lessons for a certain learner.
// It maps thumbnails/cards for each lesson.
const CompletedLessonsPage = async () => {
  const responseObject = await getCompletedLessons();
  return (
    <>
      <p className="status-message">Lessons retrieved</p>
      <div className="lessons-container">
        {responseObject.content?.map((item, index) => {
          return (
            <LessonLearnerThumb lesson={item} key={index} complete={true} />
          );
        })}
      </div>
    </>
  );
};

export default CompletedLessonsPage;
