"use client";

import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  return (
    <PlayerContext.Provider
      value={{
        name,
        setName,
        role,
        setRole,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
