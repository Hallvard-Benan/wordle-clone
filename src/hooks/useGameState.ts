import { useState } from "react";
import { GAME_CONFIG } from "../constants/gameConstants";
import type {
  GameState,
  LetterState,
  RowState,
} from "../constants/gameConstants";

export const useGameState = () => {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentLetterPos, setCurrentLetterPos] = useState(0);
  const [guesses, setGuesses] = useState<string[][]>(
    Array.from({ length: GAME_CONFIG.GUESS_COUNT }, () =>
      Array(GAME_CONFIG.LETTER_COUNT).fill("")
    )
  );
  const [submittedGuesses, setSubmittedGuesses] = useState<number[]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>(
    {}
  );
  const [boardState, setBoardState] = useState<RowState[]>([]);

  const resetGameState = () => {
    setCurrentRow(0);
    setCurrentLetterPos(0);
    setGuesses(
      Array.from({ length: GAME_CONFIG.GUESS_COUNT }, () =>
        Array(GAME_CONFIG.LETTER_COUNT).fill("")
      )
    );
    setSubmittedGuesses([]);
    setGameState("playing");
    setLetterStates({});
    setBoardState([]);
  };

  return {
    currentRow,
    setCurrentRow,
    currentLetterPos,
    setCurrentLetterPos,
    guesses,
    setGuesses,
    submittedGuesses,
    setSubmittedGuesses,
    gameState,
    setGameState,
    letterStates,
    boardState,
    setLetterStates,
    setBoardState,
    resetGameState,
  };
};
