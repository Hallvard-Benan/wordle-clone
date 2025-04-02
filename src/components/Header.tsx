import ThemeToggle from "./ThemeToggle";
import WelcomeModal from "./WelcomeModal";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme } = useTheme();

  return (
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
  );
}
