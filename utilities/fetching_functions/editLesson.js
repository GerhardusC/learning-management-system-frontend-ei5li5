"use server";
import { cookies } from "next/headers";
// This server component allows you to edit a lesson with a given ID.
// Here you add a new title, new tags, new components and the current lesson ID.
// Again the token is retrieved from the cookies for the put request.
const editLesson = async (title, tags, components, lessonId) => {
  const cookieStore = cookies();
  const token = cookieStore.get("creator_token").value;
  try {
    const res = await fetch(
      "https://learning-management-system-backend-ei5li5.vercel.app/creator/edit_lesson",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          tags: tags,
          lessonComponents: [...components],
          editingId: lessonId,
        }),
      }
    );
    const response = await res.json();
    return response.message;
  } catch (err) {
    return err.message;
  }
};

export default editLesson;
