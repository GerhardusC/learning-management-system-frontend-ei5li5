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

// This component is a form to add an image to a lesson.
// It requires only an image url and some caption text.
const AddImage = ({ urlProp = "", captionProp = "" }) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(urlProp);
  const [caption, setCaption] = useState(captionProp);
  const addingAtIndex = useSelector(
    (state) => state.creatorEditingState.addingAtIndex
  );
  const addingComponent = useSelector(
    (state) => state.creatorEditingState.addingComponent
  );
  const editingComponent = useSelector(
    (state) => state.creatorEditingState.editingComponent
  );
  // Simply returns a form requiring image link and caption.
  // Upon submission it adds a component either at the bottom
  // or at a certain index, or it edits a component.
  return (
    <form
      className={styles.formLayout}
      onSubmit={(e) => {
        e.preventDefault();
        const component = {
          url: url,
          caption: caption,
          type: "image",
        };
        if (addingComponent === true) {
          if (addingAtIndex) {
            dispatch(insertComponent(component));
            dispatch(setAddingAtIndex(false));
            dispatch(setAddingIndex(0));
          } else {
            dispatch(addComponent(component));
          }

          dispatch(setAddingComponent(false));
        }
        if (editingComponent === true) {
          dispatch(editComponent(component));
          dispatch(setEditingComponent(false));
        }
        dispatch(setCurrentComponentType("none"));
      }}
    >
      <label htmlFor="image-url-input">Image URL:</label>
      <input
        name="image-url-input"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        required
      />
      <label htmlFor="image-caption-input">Image caption:</label>
      <input
        name="image-caption-input"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
        required
      />
      <div className={styles.buttonContainer}>
        <button className={styles.addComponentButton} type="submit">
          Add image
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

export default AddImage;
