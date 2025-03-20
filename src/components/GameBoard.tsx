import { useGameContext } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";

const GameBoard = () => {
  const { guesses } = useGameContext();

  return (
    <div className="grid grid-rows-5 gap-2 mx-auto">
      {guesses.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-2"
          data-testid={`row-${rowIndex}`}
        >
          {Array(5)
            .fill("")
            .map((_, colIndex) => (
              <LetterBox
                key={colIndex}
                letter={row[colIndex] || ""}
                index={colIndex}
                row={rowIndex}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;

function LetterBox({
  letter,
  index,
  row,
}: {
  letter: string;
  index: number;
  row: number;
}) {
  const { submittedGuesses, currentRow, currentLetterPos, boardState } =
    useGameContext();
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (!submittedGuesses.includes(row)) {
      if (currentRow === row)
        return currentLetterPos === index ? "border-2" : "";
      return "";
    }

    if (boardState[row][index].state === "correct") {
      return "bg-green-500 text-white";
    }

    if (boardState[row][index].state === "present") {
      return "bg-yellow-500 text-white";
    }

    if (boardState[row][index].state === "absent") {
      return "bg-gray-500 text-white";
    }

    return "bg-gray-500 text-white ";
  };

  return (
    <div
      data-testid={`letter-box-${index}`}
      className={`size-12 sm:size-16 rounded-sm transition  
        duration-500 delay-${
          index * 2
        } flex items-center justify-center border  border-gray-500 text-xl font-bold ${getBackgroundColor()} ${
        theme === "dark" ? "text-white" : ""
      } ${
        submittedGuesses.includes(row)
          ? `animation-delay-${
              index * 2
            } animate-[flip_0.5s] border-transparent`
          : ""
      }`}
    >
      {letter}
    </div>
  );
}
