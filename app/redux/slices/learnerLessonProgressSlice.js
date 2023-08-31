"use client";
// This slice of state tracks the progress of a learner through a lesson.
import { createSlice } from "@reduxjs/toolkit";
// The total score of a lesson and the learner's current score are kept track of.
const initialState = {
  totalLessonScore: 0,
  currentScore: 0,
};
export const learnerLessonProgressSlice = createSlice({
  name: "learnerLessonProgressState",
  initialState: initialState,
  reducers: {
    // Set the total number of marks a lesson is worth.
    setTotalLessonScore: (state, action) => {
      state.totalLessonScore = action.payload;
    },
    // Add one to the score each time an interactive element is completed.
    completeInteractiveElement: (state) => {
      state.currentScore += 1;
    },
    // A way to reset the current and overall score.
    resetState: (state) => {
      state.totalLessonScore = 0;
      state.currentScore = 0;
    },
  },
});

export const {
  setTotalLessonScore,
  completeInteractiveElement,
  setFinishedScrolling,
  resetState,
} = learnerLessonProgressSlice.actions;
export default learnerLessonProgressSlice.reducer;
