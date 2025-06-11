import React, { useState, useEffect } from "react";
import { getCharacterFeedback } from "../utils/getCharacterFeedback";
import CharacterFeedback from "./CharacterFeedback";
import "./characterGuessForm.css";

export default function CharacterGuessForm({ onWin }) {
  const [characters, setCharacters] = useState([]);
  const [guessName, setGuessName] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [target, setTarget] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        const randomChar = data[Math.floor(Math.random() * data.length)];
        setTarget(randomChar);
      });
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (!target || guesses.length >= 6) return;

    const guess = characters.find(
      (char) => char.name.toLowerCase() === guessName.toLowerCase()
    );
    if (!guess) {
      alert("Character not found");
      return;
    }

    const feedback = getCharacterFeedback(guess, target);
    setGuesses([...guesses, { name: guess.name, feedback }]);
    setGuessName("");
    setSuggestions([]);

    if (feedback.every((f) => f.match === "correct")) {
      onWin && onWin();
    } else if (guesses.length === 5) {
      alert(`Game Over! The answer was ${target.name}.`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuessName(value);
    const filtered = characters.filter((char) =>
      char.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5)); // limit to 5 results
  };

  const handleSuggestionClick = (name) => {
    setGuessName(name);
    setSuggestions([]);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleGuess} className="guess-form">
        <input
          type="text"
          value={guessName}
          onChange={handleInputChange}
          placeholder="Guess a character"
          className="guess-input"
        />
        <button type="submit" className="guess-button">
          Guess
        </button>
      </form>

      <div className="suggestion-container">
        {suggestions.map((char, index) => (
          <div
            key={index}
            className="suggestion-card"
            onClick={() => handleSuggestionClick(char.name)}
          >
            {char.name}
          </div>
        ))}
      </div>

      {guesses.map((g, idx) => (
        <div key={idx}>
          <h4>Guess {idx + 1}: {g.name}</h4>
          <CharacterFeedback feedback={g.feedback} />
        </div>
      ))}
    </div>
  );
}
