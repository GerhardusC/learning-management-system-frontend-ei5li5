"use server";
import { cookies } from "next/headers";
// This component allows you to get all the lessons that are part of
// a learner's completed lessons array.
const getCompletedLessons = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("learner_token")?.value;
  try {
    const res = await fetch(
      "https://learning-management-system-backend-ei5li5.vercel.app/learner/completed_lessons",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    const response = await res.json();
    return response;
  } catch (err) {
    return err.message;
  }
};

export default getCompletedLessons;
