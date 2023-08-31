import React, { useEffect, useState } from "react";
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
// This component is a form that allows you to add a short answer question.
const AddShortanswer = ({
  questionTextProp = "",
  answerProp = "",
  correctFeedbackProp = "",
  incorrectFeedbackProp = "",
}) => {
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

  const [questionText, setQuestionText] = useState(questionTextProp);
  const [answer, setAnswer] = useState(answerProp);
  const [correctFeedback, setCorrectFeedback] = useState(correctFeedbackProp);
  const [incorrectFeedback, setIncorrectFeedback] = useState(
    incorrectFeedbackProp
  );
  // A simple form taking in all the info required to build a short answer question.
  // Again it works the same as adding the other components.
  return (
    <div>
      <form
        className={styles.formLayout}
        onSubmit={(e) => {
          e.preventDefault();
          const component = {
            type: "shortanswer",
            questionText: questionText,
            answer: answer,
            correctFeedback: correctFeedback,
            incorrectFeedback: incorrectFeedback,
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
        <label htmlFor="question-text-input">Question text:</label>
        <input
          name="question-text-input"
          type="text"
          required
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <label htmlFor="answer-input">Answer:</label>
        <input
          required
          name="answer-input"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        />
        <label htmlFor="correct-feedback-input">Correct feedback:</label>
        <input
          required
          name="correct-feedback-input"
          onChange={(e) => setCorrectFeedback(e.target.value)}
          value={correctFeedback}
        />
        <label htmlFor="incorrect-feedback-input">Incorrect feedback:</label>
        <input
          required
          name="incorrect-feedback-input"
          onChange={(e) => setIncorrectFeedback(e.target.value)}
          value={incorrectFeedback}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.addComponentButton} type="submit">
            Add question
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

export default AddShortanswer;
