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
import { setAlertStatus } from "@/app/redux/slices/alertStateSlice";

// This component returns a form which allows you to add or edit a multichoice
// question.
const AddMultichoice = ({
  questionTextProp = "",
  optionsProp = [],
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
  const [option, setOption] = useState("");
  const [options, setOptions] = useState(optionsProp.map((item) => item.text));
  const [correctFeedback, setCorrectFeedback] = useState(correctFeedbackProp);
  const [incorrectFeedback, setIncorrectFeedback] = useState(
    incorrectFeedbackProp
  );
  const [correctIndex, setCorrectIndex] = useState(-1);
  // When the component first runs we set the correct index to the option marked as correct.
  // This is only for when you are editing a component, because then the correct index already exists.
  useEffect(() => {
    for (let i = 0; i < optionsProp.length; i++) {
      if (optionsProp[i].correct) {
        setCorrectIndex(i);
      }
    }
  }, []);

  // Returns a form. The question needs at least two answer
  // options and one of them to be marked as correct.
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let correctAnswerExists = false;
          const answerOptions = [];
          if (options.length > 0) {
            for (let i = 0; i < options.length; i++) {
              if (i === correctIndex) {
                answerOptions.push({ text: options[i], correct: true });
                correctAnswerExists = true;
              } else {
                answerOptions.push({ text: options[i], correct: false });
              }
            }
          }
          if (answerOptions.length < 2) {
            dispatch(
              setAlertStatus({
                alertMessage: "You require at least two answer options.",
                alertType: "temp",
              })
            );
            return;
          }
          if (!correctAnswerExists) {
            dispatch(
              setAlertStatus({
                alertMessage:
                  "Make sure at least one answer is marked as correct.",
                alertType: "temp",
              })
            );
            return;
          }
          const component = {
            type: "multichoice",
            questionText: questionText,
            answerOptions: answerOptions,
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
        <h3>Question text:</h3>
        {/* Question text input */}
        <input
          required
          name="question-text-input"
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        {/* Answer options input, it has a button to add an option, and a button to remove each option. */}
        <h3>Answer options:</h3>
        <div className={styles.optionsContainer}>
          {options.map((item, index) => {
            return (
              <div className={styles.optionContainer} key={index}>
                <p>{item}</p>
                <div className={styles.optionActions}>
                  <input
                    type="radio"
                    name="correct-radio"
                    checked={correctIndex === index}
                    onChange={() => setCorrectIndex(index)}
                  />
                  <p>Correct</p>
                  <button
                    type="button"
                    onClick={() => {
                      options.splice(index, 1);
                      setOptions([...options]);
                    }}
                  >
                    x
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.formLayout}>
          <input
            name="add-option-input"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          />
          <button
            className={styles.addComponentButton}
            type="button"
            onClick={() => {
              setOptions((options) => [...options, option]);
            }}
          >
            +
          </button>
        </div>
        {/* Input for feedback. */}
        <h3>Feedback:</h3>
        <div className={styles.formLayout}>
          <p>Correct feedback:</p>
          <input
            required
            name="correct-feedback-input"
            value={correctFeedback}
            type="text"
            onChange={(e) => setCorrectFeedback(e.target.value)}
          />
          <p>Incorrect feedback:</p>
          <input
            required
            name="incorrect-feedback-input"
            value={incorrectFeedback}
            type="text"
            onChange={(e) => setIncorrectFeedback(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.addComponentButton} type="submit">
            Add question
          </button>
          {/* A button to cancel editing. This also resets editing state. */}
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

export default AddMultichoice;
