import React from "react";
import { useDispatch } from "react-redux";
import {
  removeComponent,
  setAddingComponent,
  setCurrentComponent,
  setCurrentComponentIndex,
  setEditingComponent,
  setAddingAtIndex,
  setAddingIndex,
} from "@/app/redux/slices/creatorEditingSlice";

import styles from "./EditingFormStyles.module.css";
// Buttons to edit or delete a component or to add another component above.
// Takes in the index of a component
// and the content of the component as props.
const EditDeleteAddAboveButtons = ({ index, component }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.buttonContainer}>
      {/* Add component above current index. */}
      <button
        className={styles.addAboveButton}
        onClick={() => {
          dispatch(setAddingIndex(index));
          dispatch(setAddingAtIndex(true));
          dispatch(setAddingComponent(true));
        }}
      >
        Add above
      </button>
      {/* Edit component at given index. */}
      <button
        className={styles.editButton}
        onClick={() => {
          dispatch(setCurrentComponentIndex(index));
          dispatch(setCurrentComponent(component));
          dispatch(setEditingComponent(true));
        }}
      >
        Edit
      </button>
      {/* Remove component with certain index. */}
      <button
        className={styles.deleteButton}
        onClick={() => dispatch(removeComponent(index))}
      >
        Delete
      </button>
    </div>
  );
};

export default EditDeleteAddAboveButtons;
