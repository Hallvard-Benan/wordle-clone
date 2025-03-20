import { useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import { useGameContext } from "./context/GameContext";
import WelcomeModal from "./components/WelcomeModal";
import GameOverModal from "./components/GameOverModal";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";
function App() {
  const { handleLetterInput, handleEnter, handleDelete, gameState } =
    useGameContext();
  const { theme } = useTheme();

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

  return (
    <div
      className={`w-screen h-[100dvh] flex flex-col justify-between items-center py-4 ${
        theme === "dark" ? "bg-gray-900" : ""
      }`}
    >
      <header className="grid grid-cols-[1fr_auto_1fr] items-center w-lg max-w-[calc(100vw-8px)] mx-auto py-4 px-2">
        <ThemeToggle />
        <h1
          className={`text-2xl text-center text-nowrap ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          GUESS THE WORD
        </h1>
        <div className="flex justify-end items-center">
          <WelcomeModal />
        </div>
      </header>
      <GameBoard />
      <Keyboard />
      <GameOverModal />
    </div>
  );
}

export default App;
