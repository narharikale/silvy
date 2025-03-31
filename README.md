# Silvy - LiveKit Video Meeting Application

A Next.js application that provides a video meeting interface using LiveKit, featuring participant management and real-time audio/video controls.

## Features

- Real-time video and audio communication
- Participant management interface
- Ability to mute/unmute participants (audio and video)
- Modern UI with responsive design

## Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```env
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
LIVEKIT_URL=your_livekit_server_url
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd silvy
```

2. Install dependencies:

```bash
npm install

```

## Running the Application

1. Start the development server:

```bash
npm run dev

```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app/components/Meet` - Video meeting components
  - `Meet.js` - Main meeting component
  - `ParticipantsList.js` - Participant management interface
- `/app/api` - API routes
  - `/connection` - Handles LiveKit connection setup
  - `/participants` - Manages participant listing
  - `/mute` - Controls participant audio/video muting

## Usage

1. Join a meeting:

   - Enter your name in the pre-join screen
   - Enable/disable your camera and microphone
   - Click "Join Meeting"

2. For sales agents:

   - go to `/sales-agent`
   - The application will automatically set your name as "sales-agent"
   - You'll have access to participant controls
   - You can mute/unmute other participants' audio and video

3. Managing participants:
   - View all participants in the right sidebar
   - Use the audio (🔊/🔇) and video (🎥/📹) buttons to control participants
   - The list automatically updates every 5 seconds

## API Endpoints

### GET /api/connection

- Parameters:
  - `roomName`: Name of the meeting room
  - `participantName`: Name of the participant
- Returns: Connection details including token and server URL

### GET /api/participants

- Parameters:
  - `roomName`: Name of the meeting room
- Returns: List of all participants in the room

### POST /api/mute

- Body:
  ```json
  {
    "roomName": "string",
    "participantIdentity": "string",
    "trackSid": "string",
    "muted": boolean
  }
  ```
- Returns: Success/failure status of the mute operation

## Development

- The project uses Next.js 15.2.2 with the App Router
- Built with React 19
- Uses LiveKit SDK for real-time communication
- ESLint for code linting
