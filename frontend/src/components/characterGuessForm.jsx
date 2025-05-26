import React, { useState } from 'react';
import { characters } from '../data/characters';
import { getCharacterFeedback } from '../utils/getCharacterFeedback';
import CharacterFeedback from './CharacterFeedback';

const CharacterGuessForm = () => {
  const [guessName, setGuessName] = useState('');
  const [feedback, setFeedback] = useState(null);
  const target = characters[0]; // Hardcoded for now (e.g. Batman)

  const handleGuess = (e) => {
    e.preventDefault();
    const guess = characters.find((char) => char.name.toLowerCase() === guessName.toLowerCase());
    if (!guess) {
      alert('Character not found!');
      return;
    }

    const result = getCharacterFeedback(guess, target);
    setFeedback(result);
  };

  return (
    <div>
      <form onSubmit={handleGuess}>
        <label>Guess the DC character:</label>
        <input
          type="text"
          value={guessName}
          onChange={(e) => setGuessName(e.target.value)}
          placeholder="e.g., Superman"
        />
        <button type="submit">Submit Guess</button>
      </form>

      {feedback && <CharacterFeedback feedback={feedback} />}
    </div>
  );
};

export default CharacterGuessForm;
