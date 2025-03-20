import { LetterState, RowState } from "../constants/gameConstants";

const WORD_LIST_URL = "/words.txt";
export const getRandomWord = async (): Promise<string> => {
  try {
    const response = await fetch(WORD_LIST_URL);
    const text = await response.text();
    const words = text.split("\n").filter((word) => word.trim().length === 5);

    if (words.length === 0) {
      throw new Error("No valid 5-letter words found in the word list");
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].trim().toUpperCase();
  } catch (error) {
    console.error("Error loading word list:", error);
    return "ERROR";
  }
};

export const handleSubmitGuess = (
  word: string,
  targetWord: string
): RowState => {
  const boardState: RowState = [];
  const guessArray = word.split("");
  const targetArray = targetWord.split("");
  const remainingTargetLetters: Record<string, number> = {};

  targetArray.forEach((char, i) => {
    if (guessArray[i] === char) {
      boardState[i] = { letter: char, state: "correct" };
    } else {
      remainingTargetLetters[char] = (remainingTargetLetters[char] || 0) + 1;
    }
  });

  guessArray.forEach((char, i) => {
    if (char !== targetArray[i]) {
      if (remainingTargetLetters[char] && remainingTargetLetters[char] > 0) {
        boardState[i] = { letter: char, state: "present" };
        remainingTargetLetters[char]--;
      } else {
        boardState[i] = { letter: char, state: "absent" };
      }
    }
  });

  return boardState;
};

export const getLetterStates = (
  boardState: RowState[]
): Record<string, LetterState> => {
  const letterStates: Record<string, LetterState> = {};
  boardState.forEach((row) => {
    row.forEach(({ letter, state }) => {
      if (state === "correct") {
        letterStates[letter] = state;
      } else if (state === "present" && letterStates[letter] !== "correct") {
        letterStates[letter] = state;
      } else if (
        state === "absent" &&
        letterStates[letter] !== "correct" &&
        letterStates[letter] !== "present"
      ) {
        letterStates[letter] = state;
      }
    });
  });

  return letterStates;
};
