"use client";

import React, { createContext, useRef, useState } from "react";

export const RoomsContext = createContext();

export const RoomsContextProvider = ({ children }) => {
  const [askingForUsername, setAskingForUsername] = useState(false);
  const [roomId, setRoomId] = useState();
  const [roomData, setRoomData] = useState();

  return (
    <RoomsContext.Provider
      value={{
        askingForUsername,
        setAskingForUsername,
        roomId,
        setRoomId,
        roomData,
        setRoomData,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};
