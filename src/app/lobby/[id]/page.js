"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Lobby } from "@/components/Lobby";
import { URL } from "@/constants";

export default function LobbyMain({ params }) {
  const id = params.id;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const getRoom = async () => {
    try {
      const res = await axios.get(`${URL}api/room/${id}`);

      setData(res.data.room);
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
