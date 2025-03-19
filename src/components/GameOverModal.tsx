import { useState, useEffect } from "react";
import { useGameContext } from "../context/GameContext";

function GameOverModal() {
  const { gameState, targetWord, resetGame } = useGameContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(gameState === "won" || gameState === "lost");
  }, [gameState]);

  return (
    <div
      className={`h-screen w-screen fixed inset-0 bg-black/50 flex items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-md space-y-4 max-w-lg mx-2">
        {gameState === "won" && (
          <>
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <p className="text-lg">You won!</p>
          </>
        )}
        {gameState === "lost" && (
          <>
            <h2 className="text-2xl font-bold">Game Over</h2>
            <p className="text-lg">The word was {targetWord}</p>
            <button
              onClick={() => {
                setIsOpen(false);
                resetGame();
              }}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Try again with a new word
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default GameOverModal;
