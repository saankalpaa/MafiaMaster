import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./join.module.css";

import { RoomsContext } from "@/context/roomsContext";
import { addPlayersInTheRoom } from "@/helper";
import { PlayerContext } from "@/context/playerContext";

import MafiaLogo from "../../assets/logo.svg";

export const AskUsername = ({ lobby = false }) => {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const { roomId } = useContext(RoomsContext);
  const { setName } = useContext(PlayerContext);

  const joinRoom = async () => {
    try {
      await addPlayersInTheRoom(roomId, username);

      setName(username);

      if (lobby) {
        window.location.reload();
        return;
      }

      router.push(`/lobby/${roomId}`);
    } catch (e) {
      alert("Sorry! Couldn't join the room you requested for.");
      return;
    }
  };

  useEffect(() => {
    const userName = localStorage.getItem("user");

    setUsername(userName);
  }, []);

  return (
    <div className={`${styles.container} containerBox`}>
      <div className={styles.header}>
        <Image src={MafiaLogo} width={48} alt="Logo" /> Mafia Master
      </div>
      <div className={styles.middleContainer}>
        <label className={styles.inputLabel}>
          Enter your name
          <input
            className={styles.idInput}
            type="text"
            value={username}
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <button className={`lightButton`} onClick={joinRoom}>
          Join the lobby
        </button>
      </div>
    </div>
  );
};
