"use client";
import React, { useEffect } from "react";
import ViewHeading from "../view_components/ViewHeading";
import ViewParagraph from "../view_components/ViewParagraph";
import ViewImage from "../view_components/ViewImage";
import ViewVideo from "../view_components/ViewVideo";
import ViewMultichoice from "../view_components/ViewMultichoice";
import ViewShortanswer from "../view_components/ViewShortanswer";
import completeLesson from "@/utilities/fetching_functions/completeLesson";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setTotalLessonScore,
  resetState,
} from "@/app/redux/slices/learnerLessonProgressSlice";
import { setAlertStatus } from "@/app/redux/slices/alertStateSlice";
import styles from "./LessonDisplays.module.css";
import Tags from "../../shared_components/Tags";

// This component allows a learner to view a lesson.

const LessonView = ({ title = "", tags = [], components = [], id = "" }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentScore = useSelector(
    (state) => state.learnerLessonProgressState.currentScore
  );
  const totalScore = useSelector(
    (state) => state.learnerLessonProgressState.totalLessonScore
  );
  // The initial score of the lesson is calculated by adding the number of
  // interactive elements together.
  useEffect(() => {
    dispatch(resetState());
    let score = 0;
    for (let i = 0; i < components.length; i++) {
      if (
        components[i].type === "multichoice" ||
        components[i].type === "shortanswer"
      ) {
        score += 1;
      }
    }
    dispatch(setTotalLessonScore(score));
  }, []);
  // Returns the lesson components. They are displayed using the appropriate
  // component based on the component type.
  return (
    <div>
      <h1 className={styles.lessonTitle}>{title}</h1>
      {components.map((component, index) => {
        switch (component.type) {
          case "heading":
            return (
              <ViewHeading
                key={index}
                text={component.content}
                weight={component.weight}
              />
            );
          case "paragraph":
            return <ViewParagraph key={index} text={component.content} />;
          case "image":
            return (
              <ViewImage
                key={index}
                url={component.url}
                caption={component.caption}
              />
            );
          case "video":
            return (
              <ViewVideo
                key={index}
                videoId={component.videoId}
                caption={component.caption}
              />
            );
          case "multichoice":
            return (
              <ViewMultichoice
                key={index}
                questionText={component.questionText}
                options={component.answerOptions}
                correctFeedback={component.correctFeedback}
                incorrectFeedback={component.incorrectFeedback}
              />
            );
          case "shortanswer":
            return (
              <ViewShortanswer
                key={index}
                questionText={component.questionText}
                answer={component.answer}
                correctFeedback={component.correctFeedback}
                incorrectFeedback={component.incorrectFeedback}
              />
            );
          default:
            return <div>No component</div>;
        }
      })}
      <div>
        <Tags tagArray={tags} />
      </div>
      <div className={styles.finishButtonContainer}>
        {/* This button finishes a lesson only if the learner has completed all interactive components. */}
        <button
          className={styles.finishLessonButton}
          onClick={async () => {
            if (currentScore === totalScore) {
              // Complete the lesson with the given ID and return the message in an alert.
              const message = await completeLesson(id);
              dispatch(resetState());
              // custom alert
              dispatch(
                setAlertStatus({ alertMessage: message, alertType: "temp" })
              );
              // Redirect and refresh. This updates the learner's completion status by refetching the data.
              router.push("/learner_dashboard");
              router.refresh();
              return;
            }
            // custom alert
            dispatch(
              setAlertStatus({
                alertMessage:
                  "Make sure you complete all the interactive elements in the lesson before trying to complete the lesson.",
                alertType: "temp",
              })
            );
          }}
        >
          Finish lesson
        </button>
      </div>
    </div>
  );
};

export default LessonView;
