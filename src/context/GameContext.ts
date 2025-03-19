import { createContext, useContext } from "react";
import type { GameState, LetterState } from "../constants/gameConstants";

interface GameContextType {
  currentRow: number;
  guesses: string[][];
  submittedGuesses: number[];
  gameState: GameState;
  currentLetterPos: number;
  targetWord: string;
  letterStates: Record<string, LetterState>;
  setTargetWord: (word: string) => void;
  handleLetterInput: (letter: string) => void;
  handleEnter: () => void;
  handleDelete: () => void;
  resetGame: () => Promise<void>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};
