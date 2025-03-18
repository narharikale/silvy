'use client'

import { Meet } from '../components/Meet/Meet';
import { useEffect, useState } from 'react';
import './styles.css';

export default function SalesAgent() {
  const [connectionDetails, setConnectionDetails] = useState(undefined);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchConnectionDetails = async () => {
      const url = new URL('/api/connection', window.location.origin);
      url.searchParams.append('roomName', '123room');
      url.searchParams.append('participantName', 'sales-agent');
      
      const connectionDetailsResp = await fetch(url.toString());
      const connectionDetailsData = await connectionDetailsResp.json();
      setConnectionDetails(connectionDetailsData);
    };

    fetchConnectionDetails();
  }, []);

  const preJoinChoices = {
    username: 'sales-agent',
    videoEnabled: true,
    audioEnabled: true,
  };

  const handleJoinMeeting = () => {
    //setIsJoined(true);
  };

  return (
    <div style={{ height: '100vh' }}>
      {!isJoined ? (
        <button 
          className="join-button"
          onClick={handleJoinMeeting}
          disabled={!connectionDetails}
        >
          Join Meeting
        </button>
      ) : (
        <Meet 
          initialConnectionDetails={connectionDetails}
          initialPreJoinChoices={preJoinChoices}
        />
      )}
    </div>
  );
}
