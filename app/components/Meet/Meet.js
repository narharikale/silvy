"use client";

import {
  formatChatMessageLinks,
  LiveKitRoom,
  PreJoin,
  VideoConference,
} from "@livekit/components-react";
import { VideoPresets, Room } from "livekit-client";
import { useState, useCallback, useMemo } from "react";
import styles from "./Meet.module.css";
import { ParticipantsList } from "./ParticipantsList";

const CONN_DETAILS_ENDPOINT = "/api/connection";

export function Meet({ onClose, source }) {
  const [preJoinChoices, setPreJoinChoices] = useState(undefined);
  const preJoinDefaults = useMemo(() => {
    return {
      username: source === "sales" ? "sales-agent" : "",
      videoEnabled: true,
      audioEnabled: true,
    };
  }, [source]);

  const [connectionDetails, setConnectionDetails] = useState(undefined);

  const handlePreJoinSubmit = useCallback(async (values) => {
    setPreJoinChoices(values);
    const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
    url.searchParams.append("roomName", "123room");
    url.searchParams.append(
      "participantName",
      source === "sales" ? "sales-agent" : values.username
    );

    const connectionDetailsResp = await fetch(url.toString());
    const connectionDetailsData = await connectionDetailsResp.json();
    setConnectionDetails(connectionDetailsData);
  }, []);

  const handlePreJoinError = useCallback(() => console.error(e), []);

  return (
    <main data-lk-theme="default" className={styles.container}>
      {connectionDetails === undefined || preJoinChoices === undefined ? (
        <div className={styles.preJoin}>
          <PreJoin
            defaults={preJoinDefaults}
            onSubmit={handlePreJoinSubmit}
            onError={handlePreJoinError}
          />
        </div>
      ) : (
        <VideoConferenceComponent
          connectionDetails={connectionDetails}
          userChoices={preJoinChoices}
          onClose={onClose}
          source={source}
        />
      )}
    </main>
  );
}

function VideoConferenceComponent({
  connectionDetails,
  userChoices,
  onClose,
  source,
}) {
  const roomOptions = useMemo(() => {
    return {
      videoCaptureDefaults: {
        resolution: VideoPresets.h720,
      },
      audioCaptureDefaults: {
        echoCancellation: true,
        noiseSuppression: true,
      },
      publishDefaults: {
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
        videoCodec: "vp8",
      },
      adaptiveStream: true,
      dynacast: true,
      rtcConfig: {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      },
    };
  }, []);

  const room = useMemo(() => new Room(roomOptions), [roomOptions]);

  const connectOptions = useMemo(() => {
    return {
      autoSubscribe: true,
    };
  }, []);

  const handleError = useCallback((error) => {
    console.error(error);
    alert(
      `Encountered an unexpected error, check the console logs for details: ${error.message}`
    );
  }, []);
  const handleEncryptionError = useCallback((error) => {
    console.error(error);
    alert(
      `Encountered an unexpected encryption error, check the console logs for details: ${error.message}`
    );
  }, []);

  return (
    <>
      <LiveKitRoom
        room={room}
        token={connectionDetails.participantToken}
        serverUrl={connectionDetails.serverUrl}
        connectOptions={connectOptions}
        video={userChoices.videoEnabled}
        audio={userChoices.audioEnabled}
        onDisconnected={onClose}
        onEncryptionError={handleEncryptionError}
        onError={handleError}
      >
        <VideoConference chatMessageFormatter={formatChatMessageLinks} />
        {source === "sales" ? (
          <ParticipantsList roomName={connectionDetails.roomName} />
        ) : (
          false
        )}
      </LiveKitRoom>
    </>
  );
}
