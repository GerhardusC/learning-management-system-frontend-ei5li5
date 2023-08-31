"use client";
// Alerts are managed by redux state.
// This slice allows you to set an alert status
// an alert type and an alert message.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertStatus: false,
  alertMessage: "",
  alertType: "",
};

export const alertStateSlice = createSlice({
  name: "alertState",
  initialState: initialState,
  reducers: {
    // Set alert status to true and set the message and alert type.
    // Format of action.payload: {alertMessage, alertType}
    setAlertStatus: (state, action) => {
      state.alertStatus = true;
      state.alertMessage = action.payload.alertMessage;
      state.alertType = action.payload.alertType;
    },
    // Clear the alert regardless of its current state.
    clearAlert: (state) => {
      state.alertStatus = false;
      state.alertMessage = "";
      state.alertType = "";
    },
  },
});

export const { setAlertStatus, clearAlert } = alertStateSlice.actions;
export default alertStateSlice.reducer;
