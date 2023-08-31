"use client";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { completeInteractiveElement } from "@/app/redux/slices/learnerLessonProgressSlice";
import styles from "./LessonView.module.css";
// The view of the multiple choice questions.
const ViewMultichoice = ({
  questionText = "",
  options = [],
  correctFeedback = "",
  incorrectFeedback = "",
}) => {
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(-1);
  const dispatch = useDispatch();
  const correctIndex = useRef(-1);
  // It returns a form of radio buttons corresponding to the answers and a submit button.
  return (
    <div className={styles.multichoiceContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          for (let i = 0; i < options.length; i++) {
            if (options[i].correct) {
              correctIndex.current = i;
            }
          }
          if (Number(currentAnswerIndex) === correctIndex.current) {
            setCorrect(true);
          } else {
            setIncorrect(true);
          }
          dispatch(completeInteractiveElement());
        }}
      >
        <h2 className={styles.componentDescription}>Question:</h2>
        <p className={styles.questionText}>{questionText}</p>
        <div className={styles.optionsContainer}>
          {/* map over the options and display them. */}
          {options.map((option, index) => {
            return (
              <div className={styles.option} key={index}>
                <input
                  // Input is disabled if the question is answered.
                  disabled={correct || incorrect}
                  checked={currentAnswerIndex === String(index)}
                  onChange={(e) => setCurrentAnswerIndex(e.target.value)}
                  value={String(index)}
                  type="radio"
                  name="multiple-choice-selection"
                  required
                />
                <label htmlFor="multiple-choice-selection">{option.text}</label>
              </div>
            );
          })}
        </div>
        {/* If an answer hasn't been given, return the submit button. */}
        {!correct && !incorrect ? (
          <div className={styles.buttonContainer}>
            <button className={styles.componentButton} type="submit">
              Submit answer
            </button>
          </div>
        ) : (
          <></>
        )}
        {/* If the answer has been given, respond with correct or incorrect feedback accordingly. */}
      </form>
      {correct && !incorrect ? (
        <div className={styles.correctFeedback}>{correctFeedback}</div>
      ) : !correct && incorrect ? (
        <div className={styles.incorrectFeedback}>{incorrectFeedback}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ViewMultichoice;
