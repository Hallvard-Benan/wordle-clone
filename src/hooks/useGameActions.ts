import { GAME_CONFIG } from "../constants/gameConstants";
import type { LetterState, RowState } from "../constants/gameConstants";
import { getLetterStates, handleSubmitGuess } from "../utils/wordUtils";

interface GameActionsProps {
  targetWord: string;
  currentRow: number;
  currentLetterPos: number;
  guesses: string[][];
  gameState: "playing" | "won" | "lost";
  boardState: RowState[];
  setCurrentLetterPos: (value: number | ((prev: number) => number)) => void;
  setGuesses: (value: string[][] | ((prev: string[][]) => string[][])) => void;
  setSubmittedGuesses: (
    value: number[] | ((prev: number[]) => number[])
  ) => void;
  setGameState: (value: "playing" | "won" | "lost") => void;
  setLetterStates: (
    value:
      | Record<string, LetterState>
      | ((prev: Record<string, LetterState>) => Record<string, LetterState>)
  ) => void;
  setBoardState: (
    value: RowState[] | ((prev: RowState[]) => RowState[])
  ) => void;
  setCurrentRow: (value: number | ((prev: number) => number)) => void;
  resetGameState: () => void;
  loadNewWord: () => Promise<void>;
}

export const useGameActions = ({
  targetWord,
  currentRow,
  currentLetterPos,
  guesses,
  gameState,
  boardState,
  setCurrentLetterPos,
  setGuesses,
  setSubmittedGuesses,
  setGameState,
  setLetterStates,
  setBoardState,
  setCurrentRow,
  resetGameState,
  loadNewWord,
}: GameActionsProps) => {
  const handleLetterInput = (letter: string) => {
    if (gameState !== "playing") return;
    if (currentLetterPos >= GAME_CONFIG.LETTER_COUNT) return;

    setGuesses((prev) => {
      const newGuesses = prev.map((row) => [...row]);
      newGuesses[currentRow][currentLetterPos] = letter;
      return newGuesses;
    });

    setCurrentLetterPos((prev) => prev + 1);
  };

  const handleEnter = () => {
    if (gameState !== "playing") return;
    if (currentLetterPos < GAME_CONFIG.LETTER_COUNT) return;

    const currentGuess = guesses[currentRow].join("");

    const rowState = handleSubmitGuess(currentGuess, targetWord);
    const newBoardState = [...boardState, rowState];
    setBoardState(newBoardState);

    const newLetterStates = getLetterStates(newBoardState);

    setLetterStates((prev) => ({ ...prev, ...newLetterStates }));

    if (currentGuess === targetWord) {
      setSubmittedGuesses((prev) => [...prev, currentRow]);
      setGameState("won");
      return;
    }

    if (currentRow >= GAME_CONFIG.GUESS_COUNT - 1) {
      setSubmittedGuesses((prev) => [...prev, currentRow]);
      setGameState("lost");
      return;
    }

    setSubmittedGuesses((prev) => [...prev, currentRow]);
    setCurrentRow((prev) => prev + 1);
    setCurrentLetterPos(0);
  };

  const handleDelete = () => {
    if (gameState !== "playing") return;
    if (currentLetterPos === 0) return;

    setGuesses((prev) => {
      const newGuesses = prev.map((row) => [...row]);
      newGuesses[currentRow][currentLetterPos - 1] = "";
      return newGuesses;
    });

    setCurrentLetterPos((prev) => prev - 1);
  };

  const resetGame = async () => {
    resetGameState();
    await loadNewWord();
  };

  return {
    handleLetterInput,
    handleEnter,
    handleDelete,
    resetGame,
  };
};
