"use server";
import { cookies } from "next/headers";
// This component allows someone to get a specific lesson by its ID.
// We use the user's role to retrieve the correct token from the cookies.
const getLesson = async (role, lessonId) => {
  const cookieStore = cookies();
  const token = cookieStore.get(`${role}_token`).value;
  try {
    const res = await fetch(
      `https://learning-management-system-backend-ei5li5.vercel.app/specific_lesson?lessonId=${lessonId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const lesson = await res.json();
    return lesson;
  } catch (err) {
    return false;
  }
};

export default getLesson;
