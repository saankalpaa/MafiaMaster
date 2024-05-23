"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Lobby } from "@/components/Lobby";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/components/firebaseConfig";

export default function LobbyMain({ params }) {
  const id = params.id;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const getRoom = async () => {
    try {
      const currentData = (await getDoc(doc(db, "rooms", id))).data();
      setData(currentData);
      setIsLoading(false);
    } catch (e) {
      router.push("/");
    }
  };

  useEffect(() => {
    if (isLoading) {
      getRoom();
    }
  }, [id]);

  if (isLoading) return "loading...";

  return <Lobby data={data} />;
}
