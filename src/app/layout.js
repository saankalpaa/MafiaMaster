import { Inter } from "next/font/google";
import "./globals.css";
import { RoomsContextProvider } from "@/context/roomsContext";
import { PlayerContextProvider } from "@/context/playerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mafia Master",
  description:
    "An AI driven game lobby that allows a group of friend to join and play a game of Mafia together.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" type="image/png" sizes="32x32" />
      </head>
      <body className={inter.className}>
        <RoomsContextProvider>
          <PlayerContextProvider>{children}</PlayerContextProvider>
        </RoomsContextProvider>
      </body>
    </html>
  );
}
