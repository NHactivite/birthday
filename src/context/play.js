"use client"
import { createContext, useContext, useState } from "react";

const PlayContext = createContext();

export const usePlay = () => {
    return useContext(PlayContext);
}

export const PlayProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
 
  return (
    <PlayContext.Provider value={{ play, setPlay }}>
      {children}
    </PlayContext.Provider>
  );
}