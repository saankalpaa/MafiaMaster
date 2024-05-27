"use client";

import React, { useContext, useEffect } from "react";
import Image from "next/image";
import styles from "./lobby.module.css";

import { URL } from "@/constants";

import MafiaLogo from "../../assets/logo.svg";
import { RoomsContext } from "@/context/roomsContext";
import { getRoomData } from "@/helper";

export const Lobby = () => {
  const { roomData, setRoomData } = useContext(RoomsContext);

  const { id, players } = roomData;

  const startGame = () => {
    let audio = new Audio("../1.mp3");
    audio.play();
  };

  const handleLinkCopy = async () => {
    const link = URL + "lobby/" + id;

    await navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getRoomData(id);

      if (!data.error || data !== roomData) {
        setRoomData(data);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.container} containerBox`}>
      <div className={styles.header}>
        <Image src={MafiaLogo} width={48} alt="Logo" /> Mafia Master
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.inputLabel}>
          Invite Players
          <div className={styles.linkCopyContainer} onClick={handleLinkCopy}>
            {URL}lobby/{id}
          </div>
        </div>

        <button className={`lightButton`} onClick={startGame}>
          Start the game
        </button>
      </div>
      <div className={styles.playerList}>
        <h3>Players list</h3>
        <ol>
          {players.map((player, id) => (
            <li key={id}>{player}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};
