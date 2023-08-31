"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { completeInteractiveElement } from "@/app/redux/slices/learnerLessonProgressSlice";
import styles from "./LessonView.module.css";

// The view of a short answer question.
// Also returns a form where you can submit your answer.
const ViewShortanswer = ({
  questionText = "",
  answer = "",
  correctFeedback = "Correct. Well done!",
  incorrectFeedback = "Incorrect.",
}) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questionComplete, setQuestionComplete] = useState("");
  const [correct, setCorrect] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className={styles.multichoiceContainer}>
      <h2 className={styles.componentDescription}>Question:</h2>
      <p className={styles.questionText}>{questionText}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuestionComplete(true);
          if (currentAnswer.toLowerCase() === answer.toLowerCase()) {
            setCorrect(true);
          }
          dispatch(completeInteractiveElement());
        }}
      >
        <input
          className={styles.answerInput}
          required
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          disabled={questionComplete}
        />
        {/* If the question is not complete, return the submit button. */}
        {!questionComplete && (
          <div className={styles.buttonContainer}>
            <button className={styles.componentButton} type="submit">
              Submit answer
            </button>
          </div>
        )}
        {/* Otherwise if the question is complete we respond with correct or incorrect feedback. */}
        {questionComplete && correct ? (
          <div className={styles.correctFeedback}>{correctFeedback}</div>
        ) : questionComplete && !correct ? (
          <div className={styles.incorrectFeedback}>{incorrectFeedback}</div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default ViewShortanswer;
