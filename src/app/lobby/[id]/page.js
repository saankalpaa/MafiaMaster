"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Lobby } from "@/components/Lobby";
import { getRoomData } from "@/helper";
import { RoomsContext } from "@/context/roomsContext";
import { AskUsername } from "@/components/JoinGame/AskUsername";

export default function LobbyMain({ params }) {
  const id = params.id;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const { setRoomId, askingForUsername, setAskingForUsername } =
    useContext(RoomsContext);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        const currentData = await getRoomData(id);

        if (currentData.error) {
          router.push("/");
          return;
        }

        setData(currentData);
        setRoomId(id);

        const user = localStorage.getItem("user");

        if (user) {
          setAskingForUsername(false);
          setIsLoading(false);
          return;
        }

        setAskingForUsername(true);
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) return "loading...";

  if (askingForUsername) {
    return <AskUsername lobby={true} />;
  }

  return <Lobby data={data} />;
}
