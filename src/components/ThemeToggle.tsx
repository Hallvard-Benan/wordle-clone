import { useTheme } from "../context/ThemeContext";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

function ThemeToggle() {
  const { toggleTheme, theme } = useTheme();
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={theme === "dark"}
        value=""
        className="sr-only peer"
        onChange={toggleTheme}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700 dark:peer-checked:bg-gray-700"></div>
      <span className="text-xl px-0.5">
        {theme === "light" ? (
          <BsFillMoonFill />
        ) : (
          <BsFillSunFill color="white" />
        )}
      </span>
    </label>
  );
}

export default ThemeToggle;
