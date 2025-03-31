import { useState, useEffect } from "react";
import styles from "./Meet.module.css";
import Image from "next/image";

export function ParticipantsList({ roomName }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParticipants = async () => {
    try {
      const response = await fetch(`/api/participants?roomName=${roomName}`);
      const data = await response.json();
      if (data.success) {
        setParticipants(data.participants);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePermission = async (participantIdentity, trackSid, isMuted) => {
    try {
      await fetch("/api/mute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName,
          participantIdentity,
          trackSid,
          muted: !isMuted,
        }),
      });

      fetchParticipants();
    } catch (error) {
      console.error("Error muting participant:", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
    const interval = setInterval(fetchParticipants, 5000);
    return () => clearInterval(interval);
  }, [roomName]);

  if (loading) {
    return <div>Loading participants...</div>;
  }

  return (
    <div className={styles.participantsList}>
      <h3>Participants</h3>
      <div className={styles.participantsGrid}>
        {participants.map((participant) => (
          <div key={participant.identity} className={styles.participantCard}>
            <div className={styles.participantInfo}>
              <span className={styles.participantName}>{participant.name}</span>
              <div className={styles.participantControls}>
                {participant.tracks.map((track) => (
                  <div key={track.sid} className={styles.trackControls}>
                    {track.type === "AUDIO" && (
                      <button
                        onClick={() =>
                          handlePermission(
                            participant.identity,
                            track.sid,
                            track.muted
                          )
                        }
                        className={styles.controlButton}
                      >
                        {track.muted ? (
                          <Image
                            alt="icon"
                            src="/assets/unmute.svg"
                            width={20}
                            height={20}
                            color="white"
                          />
                        ) : (
                          <Image
                            alt="icon"
                            src="/assets/mute.svg"
                            width={20}
                            height={20}
                            color="white"
                          />
                        )}
                      </button>
                    )}
                    {track.type === "VIDEO" && (
                      <button
                        onClick={() =>
                          handlePermission(
                            participant.identity,
                            track.sid,
                            track.muted
                          )
                        }
                        className={styles.controlButton}
                      >
                        {track.muted ? (
                          <Image
                            alt="icon"
                            src="/assets/video.svg"
                            width={20}
                            height={20}
                            color="white"
                          />
                        ) : (
                          <Image
                            alt="icon"
                            src="/assets/mute-video.svg"
                            color="white"
                            width={20}
                            height={20}
                          />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
