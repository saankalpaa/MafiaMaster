"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./lobby.module.css";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import { RoomsContext } from "@/context/roomsContext";
import { PlayerContext } from "@/context/playerContext";
import { assignEachPlayerARole, getRoomData } from "@/helper";
import { URL } from "@/constants";

import MafiaLogo from "../../assets/logo.svg";
import { RoleRevealScreen } from "./RoleRevealScreen";

export const Lobby = () => {
  const [showRoleRevealScreen, setShowRoleRevealScreen] = useState(false);

  const { roomData, setRoomData } = useContext(RoomsContext);
  const { name, setRole } = useContext(PlayerContext);

  const { id, players } = roomData;

  const startGame = async () => {
    try {
      if (players.length < 3) {
        alert("You need atleast 4 players for this game!");
        return;
      }

      setShowRoleRevealScreen(true);

      const roles = assignEachPlayerARole(players);

      const updatedRoomData = { ...roomData, roles };

      await updateDoc(doc(db, "rooms", id), {
        ...roomData,
        roles,
      });

      setRole(roles[name]);
      setRoomData(updatedRoomData);
    } catch (e) {
      return e;
    }
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

  if (showRoleRevealScreen) {
    return <RoleRevealScreen />;
  }

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
