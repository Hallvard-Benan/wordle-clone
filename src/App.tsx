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
      className={`w-screen h-screen ${theme === "dark" ? "bg-gray-900" : ""}`}
    >
      <header className="grid grid-cols-3 items-center max-w-lg mx-auto py-4">
        <ThemeToggle />
        <h1
          className={`text-2xl text-center text-nowrap ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          GUESS THE WORD
        </h1>
      </header>
      <main className="sm:w-lg mx-auto grid justify-center gap-6 py-4">
        <GameBoard />
        <Keyboard />
        <WelcomeModal />
        <GameOverModal />
      </main>
    </div>
  );
}

export default App;
