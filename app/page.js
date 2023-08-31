import Link from "next/link";
import styles from "./page.module.css";
// Very basic homepage to describe the project.
export default function Home() {
  return (
    <main>
      <h1 className={styles.pageHeading}>Explain in 5 like I'm 5</h1>
      <div className={styles.loginLinks}>
        <Link className={styles.landingLink} href="/login_learner">
          Learner login
        </Link>
        <Link className={styles.landingLink} href="/login_creator">
          Creator login
        </Link>
        <Link className={styles.landingLink} href="/register">
          Register
        </Link>
      </div>
      <div className={styles.landingContainer}>
        <h1>Welcome to EI5LI5</h1>
        <p>
          If you like teaching or learning, you have come to the right place.
          With this app you can easily create short interactive lessons as a
          creator, and view interactive lessons as a learner.
        </p>
        <p>See the videos below to find out how to use this application.</p>
        <p style={{ textAlign: "center" }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/X5GkI6PdKfE?si=cx2ecfF4Rokm1B-3"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </p>
        <p style={{ textAlign: "center" }}>
          <b>Video 1:</b> Proceeding as a learner.
        </p>
        <p style={{ textAlign: "center" }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ERQNzQOM-Vw?si=fJ6XIi2UzsAxFGLN"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </p>
        <p style={{ textAlign: "center" }}>
          <b>Video 2:</b> Proceeding as a creator.
        </p>
        <div className={styles.aboutContainer}>
          <h2>1. About the app</h2>
          <p>
            There are two types of users of this app. There are creators and
            there are learners. Creators are able to create lessons and learners
            are able to view them. Let's look at each type of user separately.
          </p>
          <h3>1.1 Creator</h3>
          <p>
            Start clicking on the "register" button. Once here, you can enter
            your details to create your account. During registration, make sure
            to select "Creator" as your role.
          </p>
          <p>
            Once you registered, you will arrive at the creator dashboard. Here,
            you are able to view all the lessons you have created. You can
            always come back to this page by clicking on "My lessons" on the
            navigation bar.
          </p>
          <p>
            To add a new lesson, click on the "Add lesson" button. Once here,
            you need to add a title to the lesson. I recommend keeping the title
            concise.
          </p>
          <p>
            Start by clicking on the green plus at the bottom of the screen.
            This will bring up a window where you can select the type of
            component you would like to add.
          </p>
          <p>
            Once you select a component type, a form will appear prompting you
            to enter information about the component.
          </p>
          <p>
            Most of the forms are self explanatory, however when adding an image
            or video you must note the following:
          </p>
          <p>
            The image url has to exist. This website does not host images, but
            rather only displays images that already exist on the web. If you
            would like to add an image that is not currently on the web, upload
            the image to Google Drive and ensure the sharing permissions are set
            to public.
          </p>
          <p>
            The video ID is the ID of a YouTube video. For example in the link
            "https://www.youtube.com/watch?v=JU6sl_yyZqs", the ID is
            JU6sl_yyZqs.
          </p>
          <h3>1.2 Learner</h3>
          <p>
            Start clicking on the "register" button. Once here, you can enter
            your details to create your account. During registration, make sure
            to select "Learner" as your role.
          </p>
          <p>
            Once you registered, you will arrive at the learner dashboard. Here,
            you are able to view all the lessons available on the platform.
          </p>
          <p>
            You can view lessons by clicking on the "View lesson" button per
            lesson. You will only be able to complete a lesson once you complete
            all interactive elements on the page. To complete the lesson you
            simply have to click the finish lesson button after completing all
            interactive elements.
          </p>
          <p>
            Once you have completed a lesson, its background will change colour
            on your home page. You can also access all of your completed lessons
            by clicking on the "Completed lessons" link in the navigation bar.
          </p>
          <p>
            Goodluck completing lessons! I sincerely hope you learn as much as
            possible!
          </p>
        </div>
        <div className={styles.techDetailsContainer}>
          <h2>2. Technical details</h2>
          <p>
            If you are interested, let me tell you a little about how I made
            this application.
          </p>

          <h3>2.1 Technologies</h3>
          <p>
            This app was created in Next.js using the new App router. According
            to the project brief for this task, the backend had to be created in
            express.js. This is of course counterintuitive, as you may know,
            because Next.js is considered a full stack framework.
          </p>
          <p>
            This said, I did still end up building a backend server in
            express.js that runs separately from the Next.js frontend.
          </p>
          <p>
            I use a MongoDB to store all the users and all the lessons.
            Learners, creators and lessons each have their own collection. A
            creator object contains only a username, password and email, while a
            learner object additionally contains a list of all the lessons they
            have completed. These are simply object references.
          </p>
          <p>
            Lessons have the following object structure, they have a title, a
            creator, search tags and an array of components.
          </p>
          <p>
            That is it, if you would like to know any more, feel free to email
            me at hardus.cronje@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
}
