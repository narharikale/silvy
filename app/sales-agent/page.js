"use client";

import { useEffect, useState } from "react";

import MeetButtonPopup from "../components/MeetButtonPopup/MeetButtonPopup";
import styles from "./sales.module.css";

export default function SalesAgent() {
  const [connectionDetails, setConnectionDetails] = useState(undefined);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchConnectionDetails = async () => {
      const url = new URL("/api/connection", window.location.origin);

      if (!url) {
        throw new Error("URL is not present");
      }
      url.searchParams.append("roomName", "123room");
      url.searchParams.append("participantName", "sales-agent");

      const connectionDetailsResp = await fetch(url.toString());
      const connectionDetailsData = await connectionDetailsResp.json();
      setConnectionDetails(connectionDetailsData);
    };

    fetchConnectionDetails();
  }, []);

  const preJoinChoices = {
    username: "sales-agent",
    videoEnabled: true,
    audioEnabled: true,
  };

  const handleJoinMeeting = () => {
    setIsJoined(true);
  };

  return (
    <div style={{ height: "100vh" }}>
      {!isJoined ? (
        <button
          className={styles.joinButton}
          onClick={handleJoinMeeting}
          disabled={!connectionDetails}
        >
          Join Meeting
        </button>
      ) : (
        <MeetButtonPopup
          showJoinButton={false}
          isInitialPopupOpen={isJoined}
          initialConnectionDetails={connectionDetails}
          initialPreJoinChoices={preJoinChoices}
        />
      )}
    </div>
  );
}
