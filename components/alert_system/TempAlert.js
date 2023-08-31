import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearAlert } from "@/app/redux/slices/alertStateSlice";
import styles from "./Alerts.module.css";

// This alert is cleared after 2.5 seconds.
const TempAlert = ({ message = "Something went wrong." }) => {
  const dispatch = useDispatch();
  // useEffect will run twice, this is not the intended behaviour, so
  // we are keeping reference to a ranOnce variable, and if the function
  // has already been run, it will not run again.
  const ranOnce = useRef(false);
  useEffect(() => {
    if (!ranOnce.current) {
      const showPeriod = setTimeout(() => {
        dispatch(clearAlert());
        clearTimeout(showPeriod);
      }, 2500);
      ranOnce.current = true;
    }
  });
  return (
    <div className={styles.alertBackground}>
      <div className={styles.alertWindow}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default TempAlert;
