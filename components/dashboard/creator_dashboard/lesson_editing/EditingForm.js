"use client";
import React, { useState, useEffect } from "react";
import styles from "./EditingFormStyles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  resetState,
  setAddingComponent,
  setInitialComponents,
} from "@/app/redux/slices/creatorEditingSlice";
import AddComponent from "@/components/dashboard/creator_dashboard/lesson_creation/AddComponent";
import EditComponent from "@/components/dashboard/creator_dashboard/lesson_creation/EditComponent";
import addLesson from "@/utilities/fetching_functions/addLesson";
import editLesson from "@/utilities/fetching_functions/editLesson";
import EditDeleteAddAboveButtons from "./EditDeleteAddAboveButtons";
import { setAlertStatus } from "@/app/redux/slices/alertStateSlice";

// This is the component that shows the lesson editor.
const EditingForm = ({
  tagsProp = [],
  titleProp = "",
  componentsProp = [],
  idProp = "",
}) => {
  const components = useSelector(
    (state) => state.creatorEditingState.currentLessonComponents
  );
  const [tags, setTags] = useState(tagsProp);
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState(titleProp);
  const router = useRouter();
  const dispatch = useDispatch();
  const addingComponent = useSelector(
    (state) => state.creatorEditingState.addingComponent
  );
  const editingComponent = useSelector(
    (state) => state.creatorEditingState.editingComponent
  );
  // If you are editing a lesson, the initial components are set
  // to the props passed in as the initial components.
  useEffect(() => {
    dispatch(setInitialComponents(componentsProp));
  }, []);
  // Upon submission of the main form, the lesson is published and written to the DB.
  // If there is no ID given in the props, the lesson will save as a new lesson,
  // otherwise it will overwrite an existing lesson.
  return (
    <div>
      <div className={styles.publishFormContainer}>
        <form
          className={styles.publishForm}
          onSubmit={async (e) => {
            // If no current lesson, publish as new lesson.
            e.preventDefault();
            if (idProp === "") {
              const response = await addLesson(title, components, tags);
              // custom alert
              dispatch(
                setAlertStatus({ alertMessage: response, alertType: "temp" })
              );
              // If we are successful, we reset state and redirect the user back to the dashboard.
              // Also refresh to get an updated list of the lessons.
              if (response === "Lesson saved successfully.") {
                router.push("/creator_dashboard");
                dispatch(resetState());
                router.refresh();
              }
              return;
            }
            // Edit the lesson found at the ID if the ID exists and we haven't returned yet.
            const response = await editLesson(title, tags, components, idProp);
            // custom alert
            dispatch(
              setAlertStatus({
                alertMessage: JSON.stringify(response),
                alertType: "temp",
              })
            );
            // If the lesson is updated, redirect the user to the dashoboard and refresh to
            // get an updated list of the lessons.
            if (response === "Lesson updated.") {
              router.push("/creator_dashboard");
              dispatch(resetState());
              router.refresh();
            }
            return;
          }}
        >
          {/* The actual form. */}
          <input
            className={styles.titleInput}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title-input"
            placeholder="Lesson title"
            required
          />
          <div className={styles.buttonContainer}>
            <button className={styles.publishButton} type="submit">
              Publish lesson
            </button>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={() => {
                router.push("/creator_dashboard");
                dispatch(resetState());
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {components.map((component, index) => {
        switch (component.type) {
          case "heading":
            return (
              <div className={styles.componentContainer} key={index}>
                {component.weight === "main" ? (
                  <h1>{component.content}</h1>
                ) : (
                  <h3>{component.content}</h3>
                )}

                <EditDeleteAddAboveButtons
                  index={index}
                  component={component}
                />
              </div>
            );
          case "paragraph":
            return (
              <div className={styles.componentContainer} key={index}>
                <p key={index}>{component.content}</p>
                <EditDeleteAddAboveButtons
                  index={index}
                  component={component}
                />
              </div>
            );
          case "video":
            return (
              <div className={styles.componentContainer} key={index}>
                <div className={styles.contentContainer}>
                  <iframe
                    src={`https://www.youtube.com/embed/${component.videoId}`}
                    title="YouTube video player"
                    allowFullScreen
                  />
                  <p>
                    <b>Video: </b>
                    {component.caption}
                  </p>
                </div>
                <EditDeleteAddAboveButtons
                  index={index}
                  component={component}
                />
              </div>
            );
          case "image":
            return (
              <div className={styles.componentContainer} key={index}>
                <div className={styles.contentContainer}>
                  <img src={component.url} />
                  <p>
                    <b>Image: </b> {component.caption}
                  </p>
                </div>
                <EditDeleteAddAboveButtons
                  index={index}
                  component={component}
                />
              </div>
            );
          case "multichoice":
            return (
              <div className={styles.componentContainer} key={index}>
                <div className={styles.questionContainer}>
                  <h2 className={styles.auxHeadingBig}>
                    Multiple choice question:
                  </h2>
                  <h3 className={styles.auxHeading}>Question text:</h3>
                  <p>{component.questionText}</p>
                  <h3 className={styles.auxHeading}>Options:</h3>
                  <ul>
                    {component.answerOptions.map((option, index) => {
                      return (
                        <li
                          className={
                            option.correct
                              ? styles.correctOption
                              : styles.incorrectOption
                          }
                          key={index}
                        >
                          {option.text}
                        </li>
                      );
                    })}
                  </ul>
                  <h3 className={styles.auxHeading}>Correct feedback:</h3>
                  <p>{component.correctFeedback}</p>
                  <h3 className={styles.auxHeading}>Incorrect feedback:</h3>
                  <p>{component.incorrectFeedback}</p>
                </div>
                <EditDeleteAddAboveButtons
                  index={index}
                  component={component}
                />
              </div>
            );
          case "shortanswer":
            return (
              <div className={styles.componentContainer} key={index}>
                <div className={styles.questionContainer}>
                  <h2 className={styles.auxHeadingBig}>
                    Short answer question:
                  </h2>
                  <h3 className={styles.auxHeading}>Question text:</h3>
                  <p>{component.questionText}</p>
                  <h3 className={styles.auxHeading}>Correct answer:</h3>
                  <p className={styles.correctOption}>{component.answer}</p>
                  <h3 className={styles.auxHeading}>Correct feedback:</h3>
                  <p>{component.correctFeedback}</p>
                  <h3 className={styles.auxHeading}>Incorrect feedback</h3>
                  <p>{component.incorrectFeedback}</p>
                </div>
                <EditDeleteAddAboveButtons
                  index={index}
                  component={component}
                />
              </div>
            );
          default:
            return <div>No component.</div>;
        }
      })}
      <div className={styles.tagFormContainer}>
        <form
          className={styles.tagsForm}
          onSubmit={(e) => {
            e.preventDefault();
            setTags([...tags, tag]);
          }}
        >
          <label className={styles.tagsLabel} htmlFor="tags-input">
            Tags will help learners find your lesson more easily.
          </label>
          <input
            placeholder="Enter tags here"
            className={styles.tagsInput}
            onChange={(e) => setTag(e.target.value)}
            name="tags-input"
            required
          />
          <button className={styles.addTagButton} type="submit">
            Add tag
          </button>
        </form>
      </div>
      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => {
          return (
            <div className={styles.tag} key={index}>
              <div>{tag}</div>
              <button
                className={styles.removeTagButton}
                onClick={() => {
                  tags.splice(index, 1);
                  setTags([...tags]);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>

      {addingComponent ? (
        <AddComponent />
      ) : (
        <button
          className={styles.addComponentButton}
          onClick={() => dispatch(setAddingComponent(true))}
        >
          +
        </button>
      )}
      {editingComponent ? <EditComponent /> : <></>}
    </div>
  );
};

export default EditingForm;
