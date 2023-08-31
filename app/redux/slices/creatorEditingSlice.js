"use client";
// This slice describes the creator's state while they are creating a lesson.
import { createSlice } from "@reduxjs/toolkit";

// These are all the variables that relate to the editing state.
const initialState = {
  currentComponentType: "none",
  currentComponentIndex: -1,
  currentComponent: {},
  currentLessonComponents: [],
  addingComponent: false,
  editingComponent: false,
  addingAtIndex: false,
  addingIndex: 0,
};

export const creatorEditingSlice = createSlice({
  name: "creatorEditingState",
  initialState: initialState,
  reducers: {
    // Set the content of the current component.
    setCurrentComponent: (state, action) => {
      state.currentComponent = action.payload;
    },
    // Append a component to the components array.
    addComponent: (state, action) => {
      state.currentLessonComponents.push(action.payload);
    },
    // Remove a component from a certain index.
    removeComponent: (state, action) => {
      state.currentLessonComponents.splice(action.payload, 1); //must be index.
    },
    // Set the "adding component" state to true or false.
    setAddingComponent: (state, action) => {
      state.addingComponent = action.payload;
    },
    // Set the "editing component" state to true or false.
    setEditingComponent: (state, action) => {
      state.editingComponent = action.payload;
    },
    // Set the type of the current component being worked on.
    setCurrentComponentType: (state, action) => {
      state.currentComponentType = action.payload;
    },
    // Set the index of the component being worked on.
    setCurrentComponentIndex: (state, action) => {
      state.currentComponentIndex = action.payload; // must be index.
    },
    // Change a component at a certain index to the action.payload.
    editComponent: (state, action) => {
      state.currentLessonComponents[state.currentComponentIndex] =
        action.payload;
    },
    // Reset all editing state to clean up.
    resetState: (state) => {
      state.currentComponentType = "none";
      state.currentComponentIndex = -1;
      state.currentComponent = {};
      state.currentLessonComponents = [];
      state.addingComponent = false;
      state.editingComponent = false;
      state.addingAtIndex = false;
      state.addingIndex = 0;
    },
    // Insert the component at the addingIndex.
    insertComponent: (state, action) => {
      state.currentLessonComponents.splice(
        state.addingIndex,
        0,
        action.payload
      );
    },
    // Set the index at which we are adding a component if we are adding it at an index.
    setAddingIndex: (state, action) => {
      state.addingIndex = action.payload;
    },
    // Set the state so it knows we are adding the component at a specific index.
    setAddingAtIndex: (state, action) => {
      state.addingAtIndex = action.payload;
    },
    // This is used when we edit a currently existing lesson. We set the current components
    // to the components that already exist in the lesson.
    setInitialComponents: (state, action) => {
      state.currentLessonComponents = action.payload;
    },
    // This looks very similar to resetState, but it does not clear
    // all the current components. It lets you cancel editing and keep
    // all the current exising components.
    cancelEditing: (state) => {
      state.currentComponentType = "none";
      state.currentComponentIndex = -1;
      state.currentComponent = {};
      state.addingComponent = false;
      state.editingComponent = false;
      state.addingAtIndex = false;
      state.addingIndex = 0;
    },
  },
});

export const {
  setCurrentComponent,
  addComponent,
  removeComponent,
  setAddingComponent,
  setCurrentComponentType,
  setEditingComponent,
  resetState,
  setCurrentComponentIndex,
  editComponent,
  insertComponent,
  setAddingIndex,
  setAddingAtIndex,
  setInitialComponents,
  cancelEditing,
} = creatorEditingSlice.actions;

export default creatorEditingSlice.reducer;
