"use client";

import React, { createContext, useState } from "react";

export const RoomsContext = createContext();

export const RoomsContextProvider = ({ children }) => {
  const [askingForUsername, setAskingForUsername] = useState(false);
  const [roomId, setRoomId] = useState();
  const [roomData, setRoomData] = useState();
  const [timer, setTimer] = useState(3);
  const [rolesRevealed, setRolesRevealed] = useState(false);

  return (
    <RoomsContext.Provider
      value={{
        askingForUsername,
        setAskingForUsername,
        roomId,
        setRoomId,
        roomData,
        setRoomData,
        timer,
        setTimer,
        rolesRevealed,
        setRolesRevealed,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};
