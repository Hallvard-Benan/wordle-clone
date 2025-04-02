import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { GameContextProvider } from "../context/GameProvider";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { handleSubmitGuess } from "../utils/gameUtils";

describe("Rendering", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() =>
        Promise.resolve({
          text: () => Promise.resolve("APPLE"),
        })
      )
    );
    render(
      <GameContextProvider>
        <App />
      </GameContextProvider>
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render 5 rows of letter 5 boxes", () => {
    const rows = screen.getAllByTestId(/^row-/);
    expect(rows).toHaveLength(5);

    rows.forEach((row) => {
      const letterBoxes = within(row).getAllByTestId(/^letter-box-/);
      expect(letterBoxes).toHaveLength(5);
    });
  });

  it("should add a green background to the letter if it is correct", async () => {
    await userEvent.click(screen.getByTestId("key-button-A"));
    await userEvent.click(screen.getByTestId("key-button-P"));
    await userEvent.click(screen.getByTestId("key-button-P"));
    await userEvent.click(screen.getByTestId("key-button-L"));
    await userEvent.click(screen.getByTestId("key-button-E"));
    await userEvent.click(screen.getByTestId("key-button-Enter"));

    const firstRow = screen.getByTestId("row-0");
    const letterBoxes = within(firstRow).getAllByTestId(/^letter-box-/);

    letterBoxes.forEach((letterBox) => {
      expect(letterBox.classList).toContain("bg-green-500");
    });
  });

  it("should add a gray background to the letter if it is not present", async () => {
    await userEvent.click(screen.getByTestId("key-button-B"));
    await userEvent.click(screen.getByTestId("key-button-P"));
    await userEvent.click(screen.getByTestId("key-button-P"));
    await userEvent.click(screen.getByTestId("key-button-L"));
    await userEvent.click(screen.getByTestId("key-button-E"));
    await userEvent.click(screen.getByTestId("key-button-Enter"));

    const firstRow = screen.getByTestId("row-0");
    const letterBoxes = within(firstRow).getAllByTestId(/^letter-box-/);
    expect(letterBoxes[0].classList).toContain("bg-gray-500");
  });

  it("should add a yellow background to the letter if it is present but in the wrong position", async () => {
    await userEvent.click(screen.getByTestId("key-button-P"));
    await userEvent.click(screen.getByTestId("key-button-A"));
    await userEvent.click(screen.getByTestId("key-button-E"));
    await userEvent.click(screen.getByTestId("key-button-A"));
    await userEvent.click(screen.getByTestId("key-button-A"));
    await userEvent.click(screen.getByTestId("key-button-Enter"));

    const firstRow = screen.getByTestId("row-0");
    const letterBoxes = within(firstRow).getAllByTestId(/^letter-box-/);

    expect(letterBoxes[0].classList).toContain("bg-yellow-500");
    expect(letterBoxes[1].classList).toContain("bg-yellow-500");
    expect(letterBoxes[2].classList).toContain("bg-yellow-500");
    expect(letterBoxes[3].classList).toContain("bg-gray-500");
    expect(letterBoxes[4].classList).toContain("bg-gray-500");
  });

  it("should not add a yellow background to the letter there are more of that letter than in the target word", async () => {
    await userEvent.click(screen.getByTestId("key-button-P"));
    await userEvent.click(screen.getByTestId("key-button-A"));
    await userEvent.click(screen.getByTestId("key-button-E"));
    await userEvent.click(screen.getByTestId("key-button-A"));
    await userEvent.click(screen.getByTestId("key-button-P"));
    await userEvent.click(screen.getByTestId("key-button-Enter"));

    const firstRow = screen.getByTestId("row-0");
    const letterBoxes = within(firstRow).getAllByTestId(/^letter-box-/);
    expect(letterBoxes[0].classList).toContain("bg-yellow-500");
    expect(letterBoxes[1].classList).toContain("bg-yellow-500");
    expect(letterBoxes[2].classList).toContain("bg-yellow-500");
    expect(letterBoxes[3].classList).toContain("bg-gray-500");
    expect(letterBoxes[3].classList).not.toContain("bg-yellow-500");
    expect(letterBoxes[4].classList).toContain("bg-yellow-500");
  });
});

describe("handleSubmitGuess", () => {
  it("should return the correct letter states if guess matches target", () => {
    const boardState = handleSubmitGuess("APPLE", "APPLE");
    expect(boardState).toEqual([
      { letter: "A", state: "correct" },
      { letter: "P", state: "correct" },
      { letter: "P", state: "correct" },
      { letter: "L", state: "correct" },
      { letter: "E", state: "correct" },
    ]);
  });

  it("should mark letters as absent if they are not in the target word", () => {
    const boardState = handleSubmitGuess("BRICK", "APPLE");
    expect(boardState).toEqual([
      { letter: "B", state: "absent" },
      { letter: "R", state: "absent" },
      { letter: "I", state: "absent" },
      { letter: "C", state: "absent" },
      { letter: "K", state: "absent" },
    ]);
  });

  it("should mark letters as present if they are in the target word but wrong position", () => {
    const boardState = handleSubmitGuess("LAEPP", "APPLE");
    expect(boardState).toEqual([
      { letter: "L", state: "present" },
      { letter: "A", state: "present" },
      { letter: "E", state: "present" },
      { letter: "P", state: "present" },
      { letter: "P", state: "present" },
    ]);
  });

  it("should mark letters as correct if they are in the right position", () => {
    const boardState = handleSubmitGuess("AMPLE", "APPLE");
    expect(boardState).toEqual([
      { letter: "A", state: "correct" },
      { letter: "M", state: "absent" },
      { letter: "P", state: "correct" },
      { letter: "L", state: "correct" },
      { letter: "E", state: "correct" },
    ]);
  });

  it("should handle duplicate letters correctly when one is in correct position", () => {
    const boardState = handleSubmitGuess("PAPER", "APPLE");
    expect(boardState).toEqual([
      { letter: "P", state: "present" },
      { letter: "A", state: "present" },
      { letter: "P", state: "correct" },
      { letter: "E", state: "present" },
      { letter: "R", state: "absent" },
    ]);
  });

  it("should not mark duplicate letters as present if target has fewer occurrences", () => {
    const boardState = handleSubmitGuess("PEEPS", "APPLE");
    expect(boardState).toEqual([
      { letter: "P", state: "present" },
      { letter: "E", state: "present" },
      { letter: "E", state: "absent" },
      { letter: "P", state: "present" },
      { letter: "S", state: "absent" },
    ]);
  });

  it("should handle mixed cases of correct, present and absent letters", () => {
    const boardState = handleSubmitGuess("PLATE", "APPLE");
    expect(boardState).toEqual([
      { letter: "P", state: "present" },
      { letter: "L", state: "present" },
      { letter: "A", state: "present" },
      { letter: "T", state: "absent" },
      { letter: "E", state: "correct" },
    ]);
  });
});
