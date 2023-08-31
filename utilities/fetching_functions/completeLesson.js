"use server";
import { cookies } from "next/headers";
// A server component to complete a lesson given a certain ID.
// Again we use cookies to retrieve the user's token to perform
// the post request with.
const completeLesson = async (lessonId) => {
  const cookieStore = cookies();
  const token = cookieStore.get("learner_token").value;
  try {
    const res = await fetch(
      "https://learning-management-system-backend-ei5li5.vercel.app/learner/complete_lesson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId: lessonId }),
      }
    );
    const response = await res.json();
    return response.message;
  } catch (err) {
    return err.message;
  }
};

export default completeLesson;
