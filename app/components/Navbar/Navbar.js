"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Meet } from "../Meet/Meet";

export default function Navbar() {
  const pathname = usePathname();
  const [showMeet, setShowMeet] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link className={styles.logoText} href="/">
            Phonio
          </Link>
        </div>
        <div className={styles.menu}>
          <Link
            className={`${styles.menuLink} ${
              pathname === "/" ? styles.active : ""
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`${styles.menuLink} ${
              pathname === "/sales-agent" ? styles.active : ""
            }`}
            href="/sales-agent"
          >
            Sales
          </Link>
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.secondaryButton}>
            Sign up
          </button>

          <button
            onClick={() => setShowMeet(true)}
            className={styles.primaryButton}
          >
            Join Meet
          </button>
        </div>
      </nav>
      {showMeet && (
        <div className={styles.meetOverlay}>
          <Meet onClose={() => setShowMeet(false)} />
        </div>
      )}
    </>
  );
}
