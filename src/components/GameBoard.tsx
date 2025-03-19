import { useGameContext } from "../context/GameContext";

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
  const {
    targetWord,
    guesses,
    submittedGuesses,
    currentRow,
    currentLetterPos,
  } = useGameContext();

  const getBackgroundColor = () => {
    if (!submittedGuesses.includes(row)) {
      if (currentRow === row)
        return currentLetterPos === index ? "border-2" : "";
      return "";
    }

    const targetWordArray = targetWord.split("");
    const guessArray = guesses[row];

    // First pass: Mark exact matches (green)
    const greenIndices = new Set<number>();
    const remainingTargetLetters: Record<string, number> = {};

    // Count remaining letters after marking greens
    targetWordArray.forEach((char, i) => {
      if (guessArray[i] === char) {
        greenIndices.add(i);
      } else {
        remainingTargetLetters[char] = (remainingTargetLetters[char] || 0) + 1;
      }
    });

    // If this position is green, return immediately
    if (greenIndices.has(index)) {
      return "bg-green-500 text-white border-0";
    }

    // Second pass: Mark yellow squares, but only if we haven't used up all instances of that letter
    if (remainingTargetLetters[letter] && remainingTargetLetters[letter] > 0) {
      // Check all positions before this one to see how many yellows we've already used
      let yellowsUsed = 0;
      for (let i = 0; i < index; i++) {
        if (!greenIndices.has(i) && guessArray[i] === letter) {
          yellowsUsed++;
        }
      }

      if (yellowsUsed < remainingTargetLetters[letter]) {
        remainingTargetLetters[letter]--;
        return "bg-yellow-500 text-white border-0";
      }
    }

    return "bg-gray-500 text-white border-0";
  };

  return (
    <div
      data-testid={`letter-box-${index}`}
      className={`size-12 rounded-sm dark:text-white flex items-center justify-center border  border-gray-500 text-xl font-bold ${getBackgroundColor()}`}
    >
      {letter}
    </div>
  );
}
