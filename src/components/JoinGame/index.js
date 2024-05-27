"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "./join.module.css";
import { useRouter } from "next/navigation";

import MafiaLogo from "../../assets/logo.svg";

import { createRoom, getRoomData } from "@/helper";
import { RoomsContext } from "@/context/roomsContext";
import { AskUsername } from "./AskUsername";

export const JoinGame = () => {
  const router = useRouter();

  const { roomId, setRoomId, askingForUsername, setAskingForUsername } =
    useContext(RoomsContext);

  const handleLobbyCreation = () => {
    createRoom(router);
  };

  const joinRoom = async () => {
    const data = await getRoomData(roomId);

    if (data.error) {
      alert(data.error);
      return;
    }

    setAskingForUsername(true);
  };

  if (askingForUsername) {
    return <AskUsername />;
  }

  return (
    <div className={`${styles.container} containerBox`}>
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

        <button className={`lightButton`} onClick={joinRoom}>
          Join a lobby
        </button>
        <button className={`underlineButton`} onClick={handleLobbyCreation}>
          Create new lobby
        </button>
      </div>
    </div>
  );
};
