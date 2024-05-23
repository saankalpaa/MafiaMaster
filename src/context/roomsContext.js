"use client";

import React, { createContext, useRef } from "react";

export const RoomsContext = createContext();

export const RoomsContextProvider = ({ children }) => {
  const roomsCollectionRef = useRef(null);

  return (
    <RoomsContext.Provider value={{ roomsCollectionRef }}>
      {children}
    </RoomsContext.Provider>
  );
};
