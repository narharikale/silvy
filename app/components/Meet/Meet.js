'use client';

import {
  formatChatMessageLinks,
  LiveKitRoom,
  PreJoin,
  VideoConference,
} from '@livekit/components-react';
import {
  ExternalE2EEKeyProvider,
  VideoPresets,
  Room,
  DeviceUnsupportedError,
} from 'livekit-client';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { decodePassphrase } from '../../../lib/client-utils';


const CONN_DETAILS_ENDPOINT = '/api/connection';

export function Meet() {
  const [preJoinChoices, setPreJoinChoices] = useState(
    undefined,
  );
  const preJoinDefaults = useMemo(() => {
    return {
      username: '',
      videoEnabled: true,
      audioEnabled: true,
    };
  }, []);
  
  const [connectionDetails, setConnectionDetails] = useState(
    undefined,
  );

  const handlePreJoinSubmit = useCallback(async (values) => {
    setPreJoinChoices(values);
    const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
    url.searchParams.append('roomName', '123room');
    url.searchParams.append('participantName', 'another');
   
    const connectionDetailsResp = await fetch(url.toString());
    const connectionDetailsData = await connectionDetailsResp.json();
    setConnectionDetails(connectionDetailsData);
  }, []);
  const handlePreJoinError = useCallback(() => console.error(e), []);

  return (
    <main data-lk-theme="default" style={{ height: '100%' }}>
      {connectionDetails === undefined || preJoinChoices === undefined ? (
        <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
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
        />
      )}
    </main>
  );
}

function VideoConferenceComponent({ connectionDetails, userChoices }) {
  const e2eePassphrase =
    typeof window !== 'undefined' && decodePassphrase(location.hash.substring(1));

  const worker =
    typeof window !== 'undefined' &&
    e2eePassphrase &&
    new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));
  const e2eeEnabled = !!(e2eePassphrase && worker);
  const keyProvider = new ExternalE2EEKeyProvider();
  const [e2eeSetupComplete, setE2eeSetupComplete] = useState(false);

  const roomOptions = useMemo(() => {
    return {
      // Video settings
      videoCaptureDefaults: {
        resolution: VideoPresets.h720,
      },
      // Audio settings
      audioCaptureDefaults: {
        echoCancellation: true,
        noiseSuppression: true,
      },
      // Publishing defaults
      publishDefaults: {
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
        videoCodec: 'vp8',
      },
      // Enable adaptive streaming
      adaptiveStream: true,
      // Enable dynacast
      dynacast: true,
      // Basic WebRTC configuration
      rtcConfig: {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },
        ],
      },
    };
  }, []);

  const room = useMemo(() => new Room(roomOptions), [roomOptions]);

  useEffect(() => {
    if (e2eeEnabled) {
      keyProvider
        .setKey(decodePassphrase(e2eePassphrase))
        .then(() => {
          room.setE2EEEnabled(true).catch((e) => {
            if (e instanceof DeviceUnsupportedError) {
              alert(
                `You're trying to join an encrypted meeting, but your browser does not support it. Please update it to the latest version and try again.`,
              );
              console.error(e);
            } else {
              throw e;
            }
          });
        })
        .then(() => setE2eeSetupComplete(true));
    } else {
      setE2eeSetupComplete(true);
    }
  }, [e2eeEnabled, room, e2eePassphrase]);

  const connectOptions = useMemo(() => {
    return {
      autoSubscribe: true,
    };
  }, []);

  const router = useRouter();
  const handleOnLeave = useCallback(() => router.push('/'), [router]);
  const handleError = useCallback((error) => {
    console.error(error);
    alert(`Encountered an unexpected error, check the console logs for details: ${error.message}`);
  }, []);
  const handleEncryptionError = useCallback((error) => {
    console.error(error);
    alert(
      `Encountered an unexpected encryption error, check the console logs for details: ${error.message}`,
    );
  }, []);

  return (
    <>
      <LiveKitRoom
        connect={e2eeSetupComplete}
        room={room}
        token={connectionDetails.participantToken}
        serverUrl={connectionDetails.serverUrl}
        connectOptions={connectOptions}
        video={userChoices.videoEnabled}
        audio={userChoices.audioEnabled}
        onDisconnected={handleOnLeave}
        onEncryptionError={handleEncryptionError}
        onError={handleError}
      >
        <VideoConference
          chatMessageFormatter={formatChatMessageLinks}
        />
      </LiveKitRoom>
    </>
  );
}