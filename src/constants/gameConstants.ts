export const GAME_CONFIG = {
  GUESS_COUNT: 5,
  LETTER_COUNT: 5,
  DEFAULT_WORD: "APPLE",
} as const;

export type GameState = "playing" | "won" | "lost";
export type LetterState = "correct" | "present" | "absent" | "unused";
export type RowState = {
  letter: string;
  state: LetterState;
}[];
