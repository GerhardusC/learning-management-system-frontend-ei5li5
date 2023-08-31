import { cookies } from "next/headers";
import LearnerNavigationBar from "@/components/dashboard/learner_dashboard/LearnerNavigationBar";
// Showing the learner navigation bar and all the children below the navbar.
// Again we use cookies to store info extracted from the token.
const LearnerDashboardLayout = ({ children }) => {
  const cookieStore = cookies();
  const username = cookieStore.get("learner_username")?.value;
  return (
    <>
      <LearnerNavigationBar username={username} />
      <main>{children}</main>
    </>
  );
};

export default LearnerDashboardLayout;
