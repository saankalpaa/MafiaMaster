"use client";

import React, { createContext, useRef, useState } from "react";

export const RoomsContext = createContext();

export const RoomsContextProvider = ({ children }) => {
  const roomsCollectionRef = useRef(null);

  const [askingForUsername, setAskingForUsername] = useState(false);
  const [roomId, setRoomId] = useState();

  return (
    <RoomsContext.Provider
      value={{
        roomsCollectionRef,
        askingForUsername,
        setAskingForUsername,
        roomId,
        setRoomId,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};
