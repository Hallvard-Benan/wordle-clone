import { useState, useEffect, useCallback } from "react";
import { getRandomWord } from "../utils/gameUtils";
import { GAME_CONFIG } from "../constants/gameConstants";

export const useWordManagement = () => {
  const [targetWord, setTargetWord] = useState<string>(
    GAME_CONFIG.DEFAULT_WORD
  );

  const loadNewWord = useCallback(async () => {
    const word = await getRandomWord();
    setTargetWord(word);
  }, []);

  useEffect(() => {
    loadNewWord();
  }, [loadNewWord]);

  return { targetWord, setTargetWord, loadNewWord };
};
