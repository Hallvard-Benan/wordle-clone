import { useEffect, useState } from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";

function WelcomeModal() {
  const [isNewPlayer, setIsNewPlayer] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    const isPlayerNew = window.localStorage.getItem("isNewPlayer") !== "false";
    setIsNewPlayer(isPlayerNew);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsNewPlayer(true)}
        className={`hover:cursor-pointer text-2xl ${
          theme === "dark" ? "text-white" : ""
        }`}
      >
        <IoIosHelpCircleOutline />
      </button>
      <div
        className={`h-screen w-screen fixed inset-0 bg-black/50 flex items-center justify-center ${
          !isNewPlayer && "hidden"
        }`}
      >
        <div className="bg-white p-4 rounded-md space-y-4 max-w-lg mx-2">
          <h2 className="text-2xl font-bold">How to play</h2>
          <ul className="space-y-2 list-disc px-2">
            <li> You have 5 attempts to guess the 5 letter word.</li>
            <li>
              After each guess, the color of the tiles will change to show how
              close your guess was to the word.
            </li>
          </ul>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="size-10 flex items-center justify-center border  border-gray-500 text-xl font-bold bg-green-500 text-white">
                A
              </div>
              <p>Letter is in the word and in the correct spot.</p>
            </div>
            <div className="flex gap-2">
              <div className="size-10 flex items-center justify-center border  border-gray-500 text-xl font-bold bg-yellow-500 text-white">
                A
              </div>
              <p>Letter is in the word but in the wrong spot.</p>
            </div>
            <div className="flex gap-2">
              <div className="size-10 flex items-center justify-center border  border-gray-500 text-xl font-bold bg-gray-500 text-white">
                A
              </div>
              <p>Letter is not in the word.</p>
            </div>
          </div>
          <button
            onClick={() => {
              window.localStorage.setItem("isNewPlayer", "false");
              setIsNewPlayer(false);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer transition-colors duration-300"
          >
            Ok, got it!
          </button>
        </div>
      </div>
    </>
  );
}

export default WelcomeModal;
