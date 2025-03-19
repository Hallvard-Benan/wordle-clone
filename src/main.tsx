import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GameContextProvider } from "./context/GameProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </ThemeProvider>
  </StrictMode>
);
