const WORD_LIST_URL = "/src/data/words.txt";
export const getRandomWord = async (): Promise<string> => {
  try {
    const response = await fetch(WORD_LIST_URL);
    const text = await response.text();
    const words = text.split("\n").filter((word) => word.trim().length === 5);

    if (words.length === 0) {
      throw new Error("No valid 5-letter words found in the word list");
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].trim().toUpperCase();
  } catch (error) {
    console.error("Error loading word list:", error);
    return "APPLE";
  }
};
