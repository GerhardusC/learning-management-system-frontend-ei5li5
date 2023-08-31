"use client";
import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

// The learner navigation bar, which is slightly similar to the
// creator navigation bar, but different enough to keep separate.
const LearnerNavigationBar = ({ username }) => {
  const path = usePathname();
  return (
    <nav className={styles.navigationBar}>
      <ul className={styles.navigationList}>
        <li className={styles.welcomeMessage}>Welcome {username}!</li>
        <li className={styles.navigationLinks}>
          <Link
            className={
              path === "/learner_dashboard"
                ? styles.activeNavigationButton
                : styles.inactiveNavigationButton
            }
            href="/learner_dashboard"
          >
            Home
          </Link>
          <Link
            className={
              path === "/learner_dashboard/completed_lessons"
                ? styles.activeNavigationButton
                : styles.inactiveNavigationButton
            }
            href="/learner_dashboard/completed_lessons"
          >
            Completed lessons
          </Link>
          <div className={styles.navSeparator}>|</div>
          <Link className={styles.logoutButton} href="/">
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LearnerNavigationBar;
