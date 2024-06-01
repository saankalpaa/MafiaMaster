import React, { useContext, useEffect, useState } from "react";
import styles from "./lobby.module.css";
import Image from "next/image";

import { PlayerContext } from "@/context/playerContext";

import CivilianImage from "../../assets/civilian.png";
import MafiaImage from "../../assets/mafia.png";

export const RoleRevealScreen = () => {
  const [timer, setTimer] = useState(3);

  const { role } = useContext(PlayerContext);

  useEffect(() => {
    let audio = new Audio("../clock.mp3");
    audio.play();

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);

          return prevTimer;
        }

        if (prevTimer === 1) {
          audio.pause();
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      audio.pause();
      clearInterval(interval);
    };
  }, []);

  if (timer === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.roleRevealSecondHeader}>
          <span className={styles.roleTextAbove}>You are</span>
          {role === "Civilian" && (
            <span className={styles.roleText}>a Civilian</span>
          )}
          {role === "Mafia" && (
            <span className={styles.roleText}>theMafia</span>
          )}
        </h3>
        <Image
          width={300}
          src={role === "Mafia" ? MafiaImage : CivilianImage}
          alt="Mafia Master Role Image"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.roleRevealHeader}>Revealing your role in</h3>
      <div className={styles.timer}>{timer}</div>
    </div>
  );
};
