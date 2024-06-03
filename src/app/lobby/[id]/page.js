"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Lobby } from "@/components/Lobby";
import { getRoomData } from "@/helper";
import { RoomsContext } from "@/context/roomsContext";
import { PlayerContext } from "@/context/playerContext";
import { AskUsername } from "@/components/JoinGame/AskUsername";

export default function LobbyMain({ params }) {
  const id = params.id;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const {
    setRoomId,
    askingForUsername,
    setAskingForUsername,
    setRoomData,
    setRolesRevealed,
  } = useContext(RoomsContext);

  const { setName, setRole } = useContext(PlayerContext);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        const currentData = await getRoomData(id);

        if (currentData.error) {
          router.push("/");
          return;
        }

        const { roles } = currentData;

        setRoomData(currentData);
        setRoomId(id);

        const user = localStorage.getItem("user");
        const roomOfUser = localStorage.getItem("room");

        setName(user);

        if ((user && roomOfUser === id) || user === "admin") {
          setRole(roles[user]);
          setRolesRevealed(currentData.rolesRevealed ?? false);
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

  return <Lobby />;
}
