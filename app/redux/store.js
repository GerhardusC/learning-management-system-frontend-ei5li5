"use client";
import { configureStore } from "@reduxjs/toolkit";
import creatorEditingSlice from "./slices/creatorEditingSlice";
import learnerLessonProgressSlice from "./slices/learnerLessonProgressSlice";
import alertStateSlice from "./slices/alertStateSlice";
// Generic store containing all slices.
export const store = configureStore({
  reducer: {
    creatorEditingState: creatorEditingSlice,
    learnerLessonProgressState: learnerLessonProgressSlice,
    alertState: alertStateSlice,
  },
});
