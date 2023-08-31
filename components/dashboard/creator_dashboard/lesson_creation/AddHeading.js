import React, { useState } from "react";
import {
  addComponent,
  setAddingComponent,
  setCurrentComponentType,
  editComponent,
  setEditingComponent,
  setAddingIndex,
  setAddingAtIndex,
  insertComponent,
  cancelEditing,
} from "@/app/redux/slices/creatorEditingSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ComponentForms.module.css";
// A form component to add a heading. It is a client component, so
// it can be interactive.
const AddHeading = ({ contentProp = "", weightProp = "main" }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(contentProp);
  const [weight, setWeight] = useState(weightProp);
  const addingAtIndex = useSelector(
    (state) => state.creatorEditingState.addingAtIndex
  );
  const addingComponent = useSelector(
    (state) => state.creatorEditingState.addingComponent
  );
  const editingComponent = useSelector(
    (state) => state.creatorEditingState.editingComponent
  );
  // Simply returns a form requiring heading content and heading weight.
  // Upon submission it adds a component either at the bottom
  // or at a certain index, or it edits a component
  return (
    <form
      className={styles.formLayout}
      onSubmit={(e) => {
        e.preventDefault();
        const component = {
          type: "heading",
          weight: weight,
          content: content,
        };
        if (addingComponent) {
          if (addingAtIndex) {
            dispatch(insertComponent(component));
            dispatch(setAddingAtIndex(false));
            dispatch(setAddingIndex(0));
          } else {
            dispatch(addComponent(component));
          }
          dispatch(setAddingComponent(false));
        }
        if (editingComponent) {
          dispatch(editComponent(component));
          dispatch(setEditingComponent(false));
        }
        dispatch(setCurrentComponentType("none"));
      }}
    >
      <label htmlFor="heading-text-input">Heading text:</label>
      <input
        name="heading-text-input"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label htmlFor="heading-weight-select">Heading weight:</label>
      <select
        name="heading-weight-select"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      >
        <option value="main">Main heading</option>
        <option value="sub">Sub heading</option>
      </select>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.addComponentButton}>
          Add heading
        </button>
        <button
          className={styles.cancelButton}
          onClick={() => {
            dispatch(cancelEditing());
          }}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddHeading;
