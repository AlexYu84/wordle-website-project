import React, { useState, useEffect } from "react";
import characters from "../data/characters";
import { getCharacterFeedback } from "../utils/getCharacterFeedback";
import CharacterFeedback from "./CharacterFeedback";

export default function CharacterGuessForm() {
  const [guessName, setGuessName] = useState("");
  const [target, setTarget] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    setTarget(randomCharacter);
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (gameOver || guesses.length >= 6) return;

    const guess = characters.find(c => c.name.toLowerCase() === guessName.toLowerCase());
    if (!guess) return alert("Character not found!");

    const feedback = getCharacterFeedback(guess, target);
    const newGuesses = [...guesses, { name: guess.name, feedback }];
    setGuesses(newGuesses);
    setGuessName("");

    const allMatch = feedback.every(f => f.match === "correct");
    if (allMatch) {
      alert("You guessed it!");
      setGameOver(true);
    } else if (newGuesses.length >= 6) {
      alert(`Game Over! The answer was ${target.name}`);
      setGameOver(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleGuess}>
        <input
          type="text"
          list="characters"
          value={guessName}
          onChange={(e) => setGuessName(e.target.value)}
          disabled={gameOver}
        />
        <datalist id="characters">
          {characters.map((char, i) => (
            <option key={i} value={char.name} />
          ))}
        </datalist>
        <button type="submit" disabled={gameOver || !guessName}>Guess</button>
      </form>

      <div>
        {guesses.map((g, idx) => (
          <div key={idx}>
            <h4>Guess {idx + 1}: {g.name}</h4>
            <CharacterFeedback feedback={g.feedback} />
          </div>
        ))}
      </div>
    </div>
  );
}
