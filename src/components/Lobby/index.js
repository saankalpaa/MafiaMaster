"use client";

import React from "react";
import Image from "next/image";
import styles from "./lobby.module.css";

import { URL } from "@/constants";

import MafiaLogo from "../../assets/logo.svg";

export const Lobby = ({ data }) => {
  const { id, players } = data;

  const startGame = () => {
    let audio = new Audio("../1.mp3");
    audio.play();
  };

  const handleLinkCopy = async () => {
    const link = URL + "lobby/" + id;

    await navigator.clipboard.writeText(link);
  };

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
