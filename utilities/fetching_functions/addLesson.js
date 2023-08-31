"use server";
import { cookies } from "next/headers";
// This server component allows a creator to add a lesson.
// This is a simple post request containing a title, an array
// of components and an array of tags.
const addLesson = async (title, components, tags) => {
  const cookie = cookies();
  try {
    const newLesson = {
      title: title,
      lessonComponents: components,
      tags: tags,
    };
    const res = await fetch(
      "https://learning-management-system-backend-ei5li5.vercel.app/creator/new_lesson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("creator_token").value}`,
        },
        body: JSON.stringify(newLesson),
      }
    );
    const response = await res.json();
    return response.message;
  } catch (err) {
    return "Something went wrong.";
  }
};

export default addLesson;
