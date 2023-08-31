"use client";
import React from "react";
import { useSelector } from "react-redux";
import TempAlert from "./TempAlert";
import PromptAlert from "./PromptAlert";

// This component returns a different alert depending on the selected
// alert type. Currently there are temporary alerts and prompting alerts.
// I.e. alerts that disappear after some time and alerts that need to be
// dismissed.
// Currently in the program only temp alerts are being used, but the prompt
// alerts do work.
const AlertComponent = () => {
  const alertStatus = useSelector((state) => state.alertState.alertStatus);
  const alertType = useSelector((state) => state.alertState.alertType);
  const alertMessage = useSelector((state) => state.alertState.alertMessage);
  if (alertStatus) {
    switch (alertType) {
      case "temp":
        return <TempAlert message={alertMessage} />;
      case "prompt":
        return <PromptAlert message={alertMessage} />;
      default:
        return;
    }
  } else {
    return;
  }
};

export default AlertComponent;
