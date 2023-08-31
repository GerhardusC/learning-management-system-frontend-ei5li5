import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import LessonCreatorThumb from "@/components/dashboard/creator_dashboard/lesson_view/LessonCreatorThumb";
import styles from "./creatorDashboard.module.css";

// This function allows a user to fetch their own lessons.
// It uses the user's token and returns the lessons.
const getLessons = async (token) => {
  const { signal } = new AbortController();
  try {
    const res = await fetch(
      "https://learning-management-system-backend-ei5li5.vercel.app/own_lessons",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: signal,
      }
    );
    const lessons = await res.json();
    return lessons;
  } catch (err) {
    return err.message;
  }
};
// This is the page where a creator can view all their own videos.
const CreatorDashboardPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("creator_token")?.value;
  // Get the lesson
  const lessonsObject = await getLessons(token);
  return (
    <div>
      <p className="status-message">{lessonsObject.message}</p>
      <div className="lessons-container">
        {lessonsObject.content?.map((item, index) => {
          return <LessonCreatorThumb key={index} lesson={item} />;
        })}
      </div>
      <div className={styles.newLessonButtonContainer}>
        <Link
          className={styles.newLessonButton}
          href="/creator_dashboard/new_lesson"
        >
          Add Lesson
        </Link>
      </div>
    </div>
  );
};

export default CreatorDashboardPage;
