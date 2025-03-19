import { useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import { useGameContext } from "./context/GameContext";
import WelcomeModal from "./components/WelcomeModal";
import GameOverModal from "./components/GameOverModal";
function App() {
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

  return (
    <div className="w-screen">
      <main className="sm:w-lg mx-auto grid justify-center gap-6 py-4">
        <h1 className="text-2xl text-center">GUESS THE WORD</h1>
        <GameBoard />
        <Keyboard />
        <WelcomeModal />
        <GameOverModal />
      </main>
    </div>
  );
}

export default App;
