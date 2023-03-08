import { createContext, ReactNode, useRef, RefObject } from 'react';
import YouTube from 'react-youtube';

export const PlayerContext = createContext<{
  playerRef: RefObject<YouTube> | null;
}>({ playerRef: null });

export function PlayerContextProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef(null);
  return (
    <PlayerContext.Provider value={{ playerRef }}>
      {children}
    </PlayerContext.Provider>
  );
}
