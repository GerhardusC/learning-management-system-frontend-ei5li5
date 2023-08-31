"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import addUser from "@/utilities/fetching_functions/addUser";
import styles from "./LandingStyles.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAlertStatus } from "@/app/redux/slices/alertStateSlice";

// This component returns a form which allows a user to register either
// as a creator or a learner.
const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("learner");
  const dispatch = useDispatch();
  return (
    <div className={styles.landingFormContainer}>
      <form
        className={styles.landingForm}
        onSubmit={async (e) => {
          e.preventDefault();
          // If the password and confirmed password match, we can add the user.
          if (password === confirmPassword) {
            const newUser = {
              username: username,
              password: password,
              email: email,
            };
            const response = await addUser(newUser, role);
            // If the user is added successfully, send them to their dashboard based on their role.
            if (response === "Success") {
              router.push(`/${role}_dashboard`);
            } else {
              // Otherwise custom alert.
              dispatch(
                setAlertStatus({ alertMessage: response, alertType: "temp" })
              );
            }
          } else {
            dispatch(
              setAlertStatus({
                alertMessage: "Passwords don't match.",
                alertType: "temp",
              })
            );
          }
        }}
      >
        {/* Very simple form inputs. */}
        <input
          type="text"
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="text"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="confirm password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <div className={styles.selectRoleForm}>
          <label htmlFor="role-select">Select role:</label>
          <select
            name="role-select"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="learner">Learner</option>
            <option value="creator">Creator</option>
          </select>
        </div>
        <button type="submit">Register</button>
        {/* A cancel button to go back home. */}
        <Link href="/">Cancel</Link>
      </form>
    </div>
  );
};

export default Register;
