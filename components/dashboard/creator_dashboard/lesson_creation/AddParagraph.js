import React, { useState } from "react";
import {
  addComponent,
  setAddingComponent,
  setCurrentComponentType,
  setEditingComponent,
  editComponent,
  setAddingIndex,
  setAddingAtIndex,
  insertComponent,
  cancelEditing,
} from "@/app/redux/slices/creatorEditingSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ComponentForms.module.css";

// This component is a form that allows you to add a paragraph to a lesson.
const AddParagraph = ({ contentProp = "" }) => {
  const [content, setContent] = useState(contentProp);
  const dispatch = useDispatch();
  const addingAtIndex = useSelector(
    (state) => state.creatorEditingState.addingAtIndex
  );
  const addingComponent = useSelector(
    (state) => state.creatorEditingState.addingComponent
  );
  const editingComponent = useSelector(
    (state) => state.creatorEditingState.editingComponent
  );
  // Simply a form that takes in some content in a textarea.
  // It is built the same as all the other addComponent forms.
  return (
    <div>
      <form
        className={styles.formLayout}
        onSubmit={(e) => {
          e.preventDefault();
          if (addingComponent) {
            if (addingAtIndex) {
              dispatch(
                insertComponent({ content: content, type: "paragraph" })
              );

              dispatch(setAddingAtIndex(false));
              dispatch(setAddingIndex(0));
            } else {
              dispatch(addComponent({ content: content, type: "paragraph" }));
            }
            dispatch(setAddingComponent(false));
          }
          if (editingComponent) {
            dispatch(editComponent({ content: content, type: "paragraph" }));
            dispatch(setEditingComponent(false));
          }
          dispatch(setCurrentComponentType("none"));
        }}
      >
        <label htmlFor="paragraph-input">Text:</label>
        <textarea
          required
          name="paragraph-input"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.addComponentButton} type="submit">
            Add paragraph
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
    </div>
  );
};

export default AddParagraph;
