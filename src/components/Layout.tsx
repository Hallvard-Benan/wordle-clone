import { useTheme } from "../context/ThemeContext";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`w-screen h-[100dvh] flex flex-col justify-between items-center py-4 ${
        theme === "dark" ? "bg-gray-900" : ""
      }`}
    >
      {children}
    </div>
  );
}
