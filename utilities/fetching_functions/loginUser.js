"use server";
import { cookies } from "next/headers";
// This function allows a user to log in based on their username, password and role.
const loginUser = async (user, role) => {
  const cookie = cookies();
  try {
    const res = await fetch(
      `https://learning-management-system-backend-ei5li5.vercel.app/${
        role === "creator" ? "login_creator" : "login_learner"
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    const userInfo = await res.json();
    // If the user is logged in successfully we set their cookies to their token and username.
    if (userInfo.message === "Success") {
      cookie.set(`${role}_token`, userInfo.token, {
        sameSite: "strict",
        path: `/${role}_dashboard`,
      });
      cookie.set(`${role}_username`, userInfo.username, {
        sameSite: "strict",
        path: `/${role}_dashboard`,
      });
      return userInfo.message;
    } else {
      return userInfo.message;
    }
  } catch (err) {
    return err.message;
  }
};

export default loginUser;
