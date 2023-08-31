import React from "react";
import Login from "@/components/landing/Login";

// Returns the login screen and the role prop is set to creator.
const CreatorLoginPage = () => {
  return (
    <div>
      <Login role="creator" />
    </div>
  );
};

export default CreatorLoginPage;
