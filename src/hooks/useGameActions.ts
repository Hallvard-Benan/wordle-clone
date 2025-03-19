import { GAME_CONFIG } from "../constants/gameConstants";
import type { LetterState } from "../constants/gameConstants";

interface GameActionsProps {
  targetWord: string;
  currentRow: number;
  currentLetterPos: number;
  guesses: string[][];
  gameState: "playing" | "won" | "lost";
  letterStates: Record<string, LetterState>;
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
  letterStates,
  setCurrentLetterPos,
  setGuesses,
  setSubmittedGuesses,
  setGameState,
  setLetterStates,
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
    const targetArray = targetWord.split("");
    const newLetterStates = { ...letterStates };

    const remainingTargetLetters: Record<string, number> = {};
    targetArray.forEach((char, i) => {
      if (currentGuess[i] === char) {
        newLetterStates[char] = "correct";
      } else {
        remainingTargetLetters[char] = (remainingTargetLetters[char] || 0) + 1;
      }
    });

    currentGuess.split("").forEach((char, i) => {
      if (char !== targetArray[i]) {
        if (remainingTargetLetters[char] && remainingTargetLetters[char] > 0) {
          remainingTargetLetters[char]--;
          newLetterStates[char] =
            newLetterStates[char] === "correct" ? "correct" : "present";
        } else {
          newLetterStates[char] = "absent";
        }
      }
    });

    setLetterStates(newLetterStates);

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
