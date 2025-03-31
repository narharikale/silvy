import { RoomServiceClient } from "livekit-server-sdk";
import { NextResponse } from "next/server";

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export async function GET(request) {
  try {
    const roomName = request.nextUrl.searchParams.get("roomName");

    if (!roomName) {
      return new NextResponse(
        JSON.stringify({
          error: "Missing required parameter: roomName",
        }),
        { status: 400 }
      );
    }

    const roomService = new RoomServiceClient(LIVEKIT_URL, API_KEY, API_SECRET);

    const participants = await roomService.listParticipants(roomName);

    return new NextResponse(
      JSON.stringify({
        success: true,
        participants,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error listing participants:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to list participants",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
