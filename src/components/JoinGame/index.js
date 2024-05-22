"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "./join.module.css";
import { useRouter } from "next/navigation";

import MafiaLogo from "../../assets/logo.svg";

import { URL } from "@/constants";
import { generateUniqueId } from "@/helper";

export const JoinGame = () => {
  const router = useRouter();

  const [roomId, setRoomId] = useState();

  const joinRoom = async () => {
    try {
      const randomUserName = "USER_" + generateUniqueId(4);

      await axios.patch(`${URL}api/room/${roomId}`, { player: randomUserName });

      router.push(`/lobby/${roomId}`);
    } catch (e) {
      alert("Sorry! Couldn't join the room you requested for.");
      return;
    }
  };

  const createRoom = async () => {
    try {
      const randomUserName = "USER_" + generateUniqueId(4);

      const res = await axios.post(`${URL}api/room`, {
        players: [randomUserName],
      });

      router.push(`${URL}lobby/${res.data.id}`);
    } catch (e) {
      alert(e);
      return;
    }
  };

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
        <button className={`underlineButton`} onClick={createRoom}>
          Create new lobby
        </button>
      </div>
    </div>
  );
};
