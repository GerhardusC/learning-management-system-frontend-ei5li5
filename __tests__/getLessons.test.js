const fetch = require("node-fetch");

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
    return err.message;
  }
};

test("Connects to server", async () => {
  expect(await getAllLessons("")).toEqual({
    message: "Failed to verify token.",
  });
});
