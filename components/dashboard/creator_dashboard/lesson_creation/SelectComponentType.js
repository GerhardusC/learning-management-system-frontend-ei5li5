import { useDispatch, useSelector } from "react-redux";
import { setCurrentComponentType } from "@/app/redux/slices/creatorEditingSlice";
import styles from "./ComponentForms.module.css";

// A simple dropdown menu to select a component type if you are adding a new component.
const SelectComponentType = () => {
  const dispatch = useDispatch();
  const currentComponentType = useSelector(
    (state) => state.creatorEditingState.currentComponentType
  );
  return (
    <form className={styles.formLayout}>
      <label htmlFor="component-type-selection">Select component type: </label>
      <select
        name="component-type-selection"
        value={currentComponentType}
        onChange={(e) => {
          dispatch(setCurrentComponentType(e.target.value));
        }}
      >
        <option value="none">Select component type</option>
        <option value="heading">Heading</option>
        <option value="paragraph">Paragraph</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="multichoice">Multiple choice question</option>
        <option value="shortanswer">Short answer question</option>
      </select>
    </form>
  );
};

export default SelectComponentType;
