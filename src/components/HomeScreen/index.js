"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

import { createRoom } from "@/helper";

import MafiaLogo from "../../assets/logo.svg";

export const HomeScreen = () => {
  return (
    <div className={`${styles.container} containerBox`}>
      <div className={styles.upperContainer}>
        <Image width={175} src={MafiaLogo} alt="Mafia Master Logo" />
        <h1>Welcome to Mafia Master</h1>
      </div>
      <div className={styles.lowerContainer}>
        <button className={`lightButton`} onClick={() => createRoom()}>
          Create new lobby
        </button>
        <Link href={"/join"} className={`transparentButton`}>
          Join existing lobby
        </Link>
      </div>
    </div>
  );
};
