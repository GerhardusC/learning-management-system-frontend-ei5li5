import React, { useState } from "react";
import {
  addComponent,
  editComponent,
  setAddingComponent,
  setCurrentComponentType,
  setEditingComponent,
  setAddingIndex,
  setAddingAtIndex,
  insertComponent,
} from "@/app/redux/slices/creatorEditingSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ComponentForms.module.css";
import { cancelEditing } from "@/app/redux/slices/creatorEditingSlice";

// This component returns a form that allows you to add a video to a lesson.
// To add a video we need to use the video ID found in the URL of a youtube video.
const AddVideo = ({ videoIdProp = "", captionProp = "" }) => {
  const [videoId, setVideoId] = useState(videoIdProp);
  const [caption, setCaption] = useState(captionProp);
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
  // A simple form taking in a video ID and a caption.
  // Again it works the same as adding the other components.
  return (
    <div>
      <form
        className={styles.formLayout}
        onSubmit={(e) => {
          e.preventDefault();
          if (addingComponent) {
            if (addingAtIndex) {
              dispatch(
                insertComponent({
                  videoId: videoId,
                  caption: caption,
                  type: "video",
                })
              );
              dispatch(setAddingAtIndex(false));
              dispatch(setAddingIndex(0));
            } else {
              dispatch(
                addComponent({
                  videoId: videoId,
                  caption: caption,
                  type: "video",
                })
              );
            }

            dispatch(setAddingComponent(false));
            return;
          }
          if (editingComponent) {
            dispatch(
              editComponent({
                videoId: videoId,
                caption: caption,
                type: "video",
              })
            );
            dispatch(setEditingComponent(false));
          }

          dispatch(setCurrentComponentType("none"));
          return;
        }}
      >
        <label htmlFor="video-id-input">ID:</label>
        <input
          name="video-id-input"
          required
          onChange={(e) => setVideoId(e.target.value)}
          value={videoId}
        />
        <label htmlFor="video-caption-input">Caption:</label>
        <input
          name="video-caption-input"
          required
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.addComponentButton} type="submit">
            Add video
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

export default AddVideo;
