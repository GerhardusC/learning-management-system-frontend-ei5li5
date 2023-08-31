"use server";
import { cookies } from "next/headers";
// This server component allows you to delete a lesson with a given
// id. Again the cookie contains the token used to delete the lesson.
const deleteLesson = async (id) => {
  const cookieStore = cookies();
  const token = cookieStore.get("creator_token").value;
  try {
    const res = await fetch(
      "https://learning-management-system-backend-ei5li5.vercel.app/creator/delete_lesson",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deletingId: id }),
      }
    );
    const response = await res.json();
    return response;
  } catch (err) {
    return err.message;
  }
};
export default deleteLesson;
