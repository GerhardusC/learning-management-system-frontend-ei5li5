import LessonLearnerThumb from "@/components/dashboard/learner_dashboard/lesson_view/LessonLearnerThumb";
import getAllLessons from "@/utilities/fetching_functions/getAllLessons";
import getCompletedLessons from "@/utilities/fetching_functions/getCompletedLessons";
import { cookies } from "next/headers";
import React from "react";

// This page shows all the lessons available to a learner.
// It simply gets all lessons using the token and then returns
// cards/thumbnails for each lesson.
const LearnerDashboardPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("learner_token")?.value;
  const completedLessons = await getCompletedLessons();
  const lessonsObject = await getAllLessons(token);
  const completedIds = completedLessons?.content.map((lesson) => lesson._id);
  return (
    <div>
      <p className="status-message">{lessonsObject.message}</p>
      <div className="lessons-container">
        {lessonsObject.content.map((lesson, index) => {
          return (
            <LessonLearnerThumb
              complete={completedIds.includes(lesson._id)}
              key={index}
              lesson={lesson}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LearnerDashboardPage;
