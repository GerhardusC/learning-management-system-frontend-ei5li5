import CreatorNavigationBar from "@/components/dashboard/creator_dashboard/view_components/CreatorNavigationBar";
import { cookies } from "next/headers";

// This layout simple adds the Creator navigation bar above all the children.
const CreatorDashboardLayout = ({ children }) => {
  // Cookies are used just to retrieve the username. I would have done this in
  // session storage, but because most of the components needing access to the
  // username and token are server components, it is better to store it in cookies.
  // Client components don't allow access to cookies.
  const cookieStore = cookies();
  const username = cookieStore.get("creator_username")?.value;
  return (
    <>
      <CreatorNavigationBar username={username} />
      <main>{children}</main>
    </>
  );
};

export default CreatorDashboardLayout;
