"use client";

import { useState } from "react";
import { Meet } from "../Meet/Meet";
import styles from "./MeetButton.module.css";

export default function MeetButton({ className }) {
  const [showMeet, setShowMeet] = useState(false);

  return (
    <>
      <button onClick={() => setShowMeet(true)} className={className}>
        Join Meet
      </button>
      {showMeet && (
        <div className={styles.meetOverlay}>
          <Meet onClose={() => setShowMeet(false)} />
        </div>
      )}
    </>
  );
}
