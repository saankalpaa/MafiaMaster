"use client";

import React from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./home.module.css";

import { URL } from "@/constants";

import MafiaLogo from "../../assets/logo.svg";
import { generateUniqueId } from "@/helper";

export const HomeScreen = () => {
  const router = useRouter();

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
        <h1>Welcome to Mafia Master</h1>
      </div>
      <div className={styles.lowerContainer}>
        <button className={`lightButton`} onClick={createRoom}>
          Create new lobby
        </button>
        <Link href={"/join"} className={`transparentButton`}>
          Join existing lobby
        </Link>
      </div>
    </div>
  );
};
