"use client";
import React from "react";
import { useState } from "react";
import loginUser from "@/utilities/fetching_functions/loginUser";
import { useRouter } from "next/navigation";
import styles from "./LandingStyles.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAlertStatus } from "@/app/redux/slices/alertStateSlice";

// A login form that takes in the user's role and logs them in either
// as a creator or learner.
const Login = ({ role }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className={styles.landingFormContainer}>
      <form
        className={styles.landingForm}
        onSubmit={async (e) => {
          e.preventDefault();
          const user = {
            username: username,
            password: password,
          };
          // login user based on their role.
          const response = await loginUser(user, role);
          // If a user is logged in they are redirected to their own dashboard.
          if (response === "Success") {
            router.push(`/${role}_dashboard`);
          } else {
            // Otherwise custom alert.
            dispatch(
              setAlertStatus({ alertType: "temp", alertMessage: response })
            );
          }
        }}
      >
        <p>Logging in as a {role}...</p>
        <input
          type="text"
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Log in</button>
        {/* The cancel button goes home. */}
        <Link href="/">Cancel</Link>
      </form>
    </div>
  );
};

export default Login;
