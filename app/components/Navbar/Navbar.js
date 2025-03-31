"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MeetButtonPopup from "../MeetButtonPopup/MeetButtonPopup";

export default function Navbar() {
  const pathname = usePathname();
  const hideNavbar = pathname === "/sales-agent";

  return hideNavbar ? (
    <></>
  ) : (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link className={styles.logoText} href="/">
            PHONIO
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
          <MeetButtonPopup className={styles.primaryButton} />
        </div>
      </nav>
    </>
  );
}
