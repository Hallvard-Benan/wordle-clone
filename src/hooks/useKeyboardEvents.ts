import { useEffect } from "react";
import { useGameContext } from "../context/GameContext";

export const useKeyboardEvents = () => {
  const { handleLetterInput, handleEnter, handleDelete, gameState } =
    useGameContext();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState !== "playing") return;

      if (event.key.match(/^[a-zA-Z]$/)) {
        handleLetterInput(event.key.toUpperCase());
      } else if (event.key === "Enter") {
        handleEnter();
      } else if (event.key === "Backspace") {
        handleDelete();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, handleLetterInput, handleEnter, handleDelete]);
};
