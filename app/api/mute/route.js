import { RoomServiceClient } from "livekit-server-sdk";
import { NextResponse } from "next/server";

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export async function POST(request) {
  try {
    const { roomName, participantIdentity, trackSid, muted } =
      await request.json();

    if (!roomName || !participantIdentity || !trackSid || muted === undefined) {
      return new NextResponse(
        JSON.stringify({
          error:
            "Missing required parameters: roomName, participantIdentity, trackSid, and muted are required",
        }),
        { status: 400 }
      );
    }

    const roomService = new RoomServiceClient(LIVEKIT_URL, API_KEY, API_SECRET);

    await roomService.mutePublishedTrack(
      roomName,
      participantIdentity,
      trackSid,
      muted
    );

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: `Track ${muted ? "muted" : "unmuted"} successfully`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error muting/unmuting track:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to mute/unmute track",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
