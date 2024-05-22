"use client";

import React, { useState } from "react";
import Image from "next/image";

import styles from "./join.module.css";
import MafiaLogo from "../../assets/logo.svg";

export const JoinGame = () => {
  const [roomId, setRoomId] = useState();

  const joinRoom = () => {
    //
  };

  return (
    <div className={`${styles.container} container-box`}>
      <div className={styles.upperContainer}>
        <Image width={175} src={MafiaLogo} alt="Mafia Master Logo" />
        <h1> Join a Game</h1>
      </div>
      <div className={styles.lowerContainer}>
        <label className={styles.inputLabel}>
          Enter the lobby code
          <input
            className={styles.idInput}
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </label>

        <button
          className={`lightButton ${styles.fullButton}`}
          onClick={joinRoom}
        >
          Join a lobby
        </button>
        <button className={`underlineButton`}>Create new lobby</button>
      </div>
    </div>
  );
};
