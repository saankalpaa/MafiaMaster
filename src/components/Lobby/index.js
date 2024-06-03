"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./lobby.module.css";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { RoleRevealScreen } from "./RoleRevealScreen";
import { Story } from "./Story";

import { RoomsContext } from "@/context/roomsContext";
import { PlayerContext } from "@/context/playerContext";
import { assignEachPlayerARole, getRoomData } from "@/helper";
import { URL } from "@/constants";

import MafiaLogo from "../../assets/logo.svg";

export const Lobby = () => {
  const [showRoleRevealScreen, setShowRoleRevealScreen] = useState(false);

  const { roomData, setRoomData, rolesRevealed } = useContext(RoomsContext);
  const { name, setRole } = useContext(PlayerContext);

  const { id, players } = roomData;

  const startGame = async () => {
    try {
      if (players.length < 3) {
        alert("You need atleast 4 players for this game!");
        return;
      }

      const roles = assignEachPlayerARole(players);

      const updatedRoomData = { ...roomData, roles, gameStarted: true };

      await updateDoc(doc(db, "rooms", id), updatedRoomData);

      setRole(roles[name]);

      if (name !== "admin") {
        setShowRoleRevealScreen(true);
      }

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

      if (data.error || data === roomData) return;

      const { gameStarted } = data;

      setRoomData(data);

      if (gameStarted && name !== "admin") {
        setShowRoleRevealScreen(true);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (showRoleRevealScreen || rolesRevealed) {
    return <RoleRevealScreen />;
  }

  // if (!showRoleRevealScreen && rolesRevealed) {
  //   return <Story />;
  // }

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

        {name == "admin" && (
          <button className={`lightButton`} onClick={startGame}>
            Start the game
          </button>
        )}
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
