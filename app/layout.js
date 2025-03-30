import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Phonio",
  description: "Phonio application",
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
