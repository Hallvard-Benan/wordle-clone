import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { GameContextProvider } from "../context/GameProvider";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Word Guessing routine", () => {
  beforeEach(() => {
    render(
      <GameContextProvider>
        <App />
      </GameContextProvider>
    );
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
