"use client";
import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

// The navigation bar for learners and creators are slightly different,
// This is the navbar for creators.
// usePathname is used to highlight the currently active path.
const CreatorNavigationBar = ({ username }) => {
  const path = usePathname();
  return (
    <nav className={styles.navigationBar}>
      <ul className={styles.navigationList}>
        <li className={styles.welcomeMessage}>Welcome {username}!</li>
        <li className={styles.navigationLinks}>
          <Link
            className={
              path === "/creator_dashboard"
                ? styles.activeNavigationButton
                : styles.inactiveNavigationButton
            }
            href="/creator_dashboard"
          >
            My lessons
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

export default CreatorNavigationBar;
