import { useGameContext } from "../context/GameContext";

const Keyboard = () => {
  const { handleLetterInput, handleEnter, handleDelete } = useGameContext();
  const row1 = "QWERTYUIOP".split("");
  const row2 = "ASDFGHJKL".split("");
  const row3 = "ZXCVBNM".split("");

  return (
    <div className="w-lg max-w-[calc(100vw-8px)] flex flex-col gap-2 px-2">
      <div className="flex justify-center gap-1">
        {row1.map((key) => (
          <KeyButton
            key={key}
            letter={key}
            onClick={() => handleLetterInput(key)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-1">
        {row2.map((key) => (
          <KeyButton
            key={key}
            letter={key}
            onClick={() => handleLetterInput(key)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-1 ">
        <KeyButton
          letter="Enter"
          onClick={handleEnter}
          className="bg-blue-500 text-white px-2"
        />
        {row3.map((key) => (
          <KeyButton
            key={key}
            letter={key}
            onClick={() => handleLetterInput(key)}
          />
        ))}
        <KeyButton
          letter="Delete"
          onClick={handleDelete}
          className="bg-red-500 text-white px-2"
        />
      </div>
    </div>
  );
};

export default Keyboard;

function KeyButton({
  letter,
  onClick,
  className,
}: {
  letter: string;
  onClick: () => void;
  className?: string;
}) {
  const { letterStates } = useGameContext();

  const getKeyColor = () => {
    switch (letterStates[letter]) {
      case "correct":
        return "bg-green-500 text-white";
      case "present":
        return "bg-yellow-500 text-white";
      case "absent":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div
      onClick={onClick}
      data-testid={`key-button-${letter}`}
      className={`flex flex-1 py-2 items-center justify-center rounded-md hover:cursor-pointer hover:opacity-70 transition-all duration-300 ${getKeyColor()} ${className}`}
    >
      {letter}
    </div>
  );
}
