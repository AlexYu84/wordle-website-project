import React, { useState, useEffect } from "react";
import { getCharacterFeedback } from "../utils/getCharacterFeedback";
import CharacterFeedback from "./CharacterFeedback";
import Modal from "./modal"

export default function CharacterGuessForm({ onWin }) {
  const [characters, setCharacters] = useState([]);
  const [guessName, setGuessName] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [target, setTarget] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // Fetch characters from backend
    fetch("http://localhost:3000/api/characters") // Or just '/api/characters' if using Vite proxy
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);

        // Pick a random target character
        const randomChar = data[Math.floor(Math.random() * data.length)];
        setTarget(randomChar);
      })
      .catch((err) => {
        console.error("Error fetching character data:", err);
      });
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (!target || guesses.length >= 6) return;

    const guess = characters.find((char) => char.name.toLowerCase() === guessName.toLowerCase());
    if (!guess) {
      alert("Character not found");
      return;
    }

    const feedback = getCharacterFeedback(guess, target);
    setGuesses([...guesses, { name: guess.name, feedback }]);
    setGuessName("");

    if (feedback.every(f => f.match === "correct")) {
      onWin();
    } else if (guesses.length === 5) {
      alert(`Game Over! The answer was ${target.name}.`);
    }
  };

  return (
    <div>
      <form onSubmit={handleGuess}>
        <input
          list="characters"
          value={guessName}
          onChange={(e) => setGuessName(e.target.value)}
          placeholder="Guess a character"
        />
        <datalist id="characters">
          {characters.map((char, i) => (
            <option key={i} value={char.name} />
          ))}
        </datalist>
        <button type="submit">Guess</button>
      </form>

      {guesses.map((g, idx) => (
        <div key={idx}>
          <h4>Guess {idx + 1}: {g.name}</h4>
          <CharacterFeedback feedback={g.feedback} />
        </div>
      ))}
      
    </div>
  );
}
