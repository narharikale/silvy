import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Phonio - Video Meeting Platform",
  description:
    "A modern video meeting platform with real-time participant management and sales agent features.",
  keywords: "video meeting, livekit, sales agent, video conference",
  authors: [{ name: "Phonio Team" }],
  creator: "Phonio",
  publisher: "Phonio",
  openGraph: {
    title: "Phonio - Video Meeting Platform",
    description:
      "A modern video meeting platform with real-time participant management and sales agent features.",
    url: "https://phonio.com",
    siteName: "Phonio",
    images: [
      {
        url: "https://osmo.b-cdn.net/website/meta-image/OG.jpg",
        height: 630,
        alt: "Phonio Video Meeting Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
