"use client";

import React from "react";
import styles from "./home.module.css";

import MafiaLogo from "../../assets/logo.svg";
import Image from "next/image";

export const HomeScreen = () => {
  const handleButtonClick = () => {
    let audio = new Audio("1.mp3");
    audio.play();
  };

  return (
    <div className={`${styles.container} container-box`}>
      <div className={styles.upperContainer}>
        <Image width={175} src={MafiaLogo} alt="Mafia Master Logo" />
        <h1>Welcome to Mafia Master</h1>
      </div>
      <div className={styles.lowerContainer}>
        <button
          className={`lightButton ${styles.fullButton}`}
          onClick={handleButtonClick}
        >
          Create new lobby
        </button>
        <button
          className={`transparentButton ${styles.fullButton}`}
          onClick={handleButtonClick}
        >
          Join existing lobby
        </button>
      </div>
    </div>
  );
};
