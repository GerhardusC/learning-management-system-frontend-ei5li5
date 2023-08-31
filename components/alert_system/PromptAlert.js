import React from "react";
import { useDispatch } from "react-redux";
import { clearAlert } from "@/app/redux/slices/alertStateSlice";
import styles from "./Alerts.module.css";

// This alert returns an alert with a button to clear the alert.
// It is not currently being used anywhere in the application.
const PromptAlert = ({ message = "Something went wrong." }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.alertBackground}>
      <div className={styles.alertWindow}>
        <p>{message}</p>
        <button
          onClick={() => {
            dispatch(clearAlert());
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default PromptAlert;
