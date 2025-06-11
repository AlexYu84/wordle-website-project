import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterGuessForm from "./characterGuessForm";

// Mock character data
const mockCharacters = [
  {
    name: "Batman",
    alignment: "hero",
    hasPowers: false,
    city: "Gotham City",
    origin: "earth",
    weaponType: "gadgets",
    species: "human"
  },
  {
    name: "Superman",
    alignment: "hero",
    hasPowers: true,
    city: "Metropolis",
    origin: "krypton",
    weaponType: "none",
    species: "kryptonian"
  }
];

// Mock getCharacterFeedback utility
vi.mock("../utils/getCharacterFeedback", () => ({
  getCharacterFeedback: (guess, target) => {
    return Object.keys(guess).map((key) => ({
      attribute: key,
      match: guess[key] === target[key] ? "correct" : "incorrect"
    }));
  }
}));

// Mock the data import inside CharacterGuessForm
vi.mock("../data/characters", () => mockCharacters);

describe("CharacterGuessForm", () => {
  it("renders input and guess button", () => {
    render(<CharacterGuessForm />);
    expect(screen.getByPlaceholderText(/guess a character/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /guess/i })).toBeInTheDocument();
  });

  it("shows alert if character is not found", () => {
    window.alert = vi.fn(); // mock alert

    render(<CharacterGuessForm />);
    const input = screen.getByPlaceholderText(/guess a character/i);
    const button = screen.getByRole("button", { name: /guess/i });

    fireEvent.change(input, { target: { value: "Green Arrow" } });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Character not found");
  });
});
