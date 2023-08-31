import React from "react";
// Displays the heading.
const ViewHeading = ({ text, weight }) => {
  return <div>{weight === "main" ? <h2>{text}</h2> : <h3>{text}</h3>}</div>;
};

export default ViewHeading;
