import React from "react";
import AddHeading from "./AddHeading";
import AddImage from "./AddImage";
import AddParagraph from "./AddParagraph";
import AddVideo from "./AddVideo";
import { useSelector } from "react-redux";
import AddMultichoice from "./AddMultichoice";
import AddShortanswer from "./AddShortanswer";
import styles from "./ComponentForms.module.css";
// This component is almost the same as the AddComponent component.
// The only difference here is that the component type comes from
// the current component, and the initial values as well.
const EditComponent = () => {
  const currentComponent = useSelector(
    (state) => state.creatorEditingState.currentComponent
  );
  switch (currentComponent.type) {
    case "heading":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <AddHeading
              contentProp={currentComponent.content}
              weightProp={currentComponent.weight}
            />
          </div>
        </div>
      );
    case "image":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <AddImage
              urlProp={currentComponent.url}
              captionProp={currentComponent.caption}
            />
          </div>
        </div>
      );
    case "paragraph":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <AddParagraph contentProp={currentComponent.content} />
          </div>
        </div>
      );
    case "video":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <AddVideo
              videoIdProp={currentComponent.videoId}
              captionProp={currentComponent.caption}
            />
          </div>
        </div>
      );
    case "multichoice":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <AddMultichoice
              questionTextProp={currentComponent.questionText}
              optionsProp={currentComponent.answerOptions}
              correctFeedbackProp={currentComponent.correctFeedback}
              incorrectFeedbackProp={currentComponent.incorrectFeedback}
            />
          </div>
        </div>
      );
    case "shortanswer":
      return (
        <div className={styles.modalBackground}>
          <div className={styles.modalWindow}>
            <AddShortanswer
              questionTextProp={currentComponent.questionText}
              answerProp={currentComponent.answer}
              correctFeedbackProp={currentComponent.correctFeedback}
              incorrectFeedbackProp={currentComponent.incorrectFeedback}
            />
          </div>
        </div>
      );
    default:
      return <></>;
  }
};

export default EditComponent;
