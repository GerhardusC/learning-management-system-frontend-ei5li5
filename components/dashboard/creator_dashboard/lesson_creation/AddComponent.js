import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddHeading from "./AddHeading";
import AddImage from "./AddImage";
import AddParagraph from "./AddParagraph";
import AddVideo from "./AddVideo";
import AddMultichoice from "./AddMultichoice";
import AddShortanswer from "./AddShortanswer";
import SelectComponentType from "./SelectComponentType";
import styles from "./ComponentForms.module.css";
import { cancelEditing } from "@/app/redux/slices/creatorEditingSlice";

// This component returns a different form based on the currently selected
// component type. These forms display inside of a modal window.
// It is a simple switch statement that takes in the current component type
// in the redux store and returns the appropriate component.
const AddComponent = () => {
  const currentComponentType = useSelector(
    (state) => state.creatorEditingState.currentComponentType
  );
  const dispatch = useDispatch();

  switch (currentComponentType) {
    case "heading":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <SelectComponentType />
            <AddHeading />
          </div>
        </div>
      );
    case "image":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <SelectComponentType />
            <AddImage />
          </div>
        </div>
      );
    case "paragraph":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <SelectComponentType />
            <AddParagraph />
          </div>
        </div>
      );
    case "video":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <SelectComponentType />
            <AddVideo />
          </div>
        </div>
      );
    case "multichoice":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <SelectComponentType />
            <AddMultichoice />
          </div>
        </div>
      );
    case "shortanswer":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <SelectComponentType />
            <AddShortanswer />
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <SelectComponentType />
            <div className={styles.buttonContainer}>
              <button
                onClick={() => dispatch(cancelEditing())}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
  }
};

export default AddComponent;
