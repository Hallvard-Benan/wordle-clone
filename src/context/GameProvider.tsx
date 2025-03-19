import { ReactNode } from "react";
import { GameContext } from "./GameContext";
import { useWordManagement } from "../hooks/useWordManagement";
import { useGameState } from "../hooks/useGameState";
import { useGameActions } from "../hooks/useGameActions";

interface GameContextProviderProps {
  children: ReactNode;
}

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const { targetWord, setTargetWord, loadNewWord } = useWordManagement();
  const gameState = useGameState();
  const gameActions = useGameActions({
    targetWord,
    loadNewWord,
    ...gameState,
  });

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        ...gameActions,
        targetWord,
        setTargetWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
