"use client";

import { useEffect, useState } from "react";

import MeetButtonPopup from "../components/MeetButtonPopup/MeetButtonPopup";
import styles from "./sales.module.css";

export default function SalesAgent() {
  return (
    <div style={{ height: "100vh" }}>
      <MeetButtonPopup className={styles.joinButton} source="sales" />
    </div>
  );
}
