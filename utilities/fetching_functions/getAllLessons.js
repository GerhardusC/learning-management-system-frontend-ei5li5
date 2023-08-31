"use server";
// This server component allows you to get all the lessons that exist.
// It takes in a token and does a simple get request.
const getAllLessons = async (token) => {
  try {
    const res = await fetch(
      `https://learning-management-system-backend-ei5li5.vercel.app/lessons`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const lessons = await res.json();
    return lessons;
  } catch (err) {
    return false;
  }
};

export default getAllLessons;
