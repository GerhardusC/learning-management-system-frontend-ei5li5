"use server";
import { cookies } from "next/headers";
// This is a server component to add users to the database.
// Based on their role, we go to the register learner, or creator endpoints.
const addUser = async (user, role) => {
  const cookie = cookies();
  try {
    const res = await fetch(
      `https://learning-management-system-backend-ei5li5.vercel.app/${
        role === "creator" ? "register_creator" : "register_learner"
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    const userInfo = await res.json();
    // If the user is added, we set their token into a cookie and redirect them
    // to the relevant dashboard. We also add the username to a cookie for later use.
    if (userInfo.message === "Success") {
      cookie.set(`${role}_token`, userInfo.token, {
        sameSite: "strict",
        path: `/${role}_dashboard`,
      });
      cookie.set(`${role}_username`, userInfo.username, {
        sameSite: "strict",
        path: `/${role}_dashboard`,
      });
      return "Success";
    } else {
      return userInfo.message;
    }
  } catch (err) {
    return err.message;
  }
};

export default addUser;
