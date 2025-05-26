export function getCharacterFeedback(guess, target) {
  const feedback = [];

  for (const trait of Object.keys(target)) {
    if (trait === 'name') continue;

    if (guess[trait] === target[trait]) {
      feedback.push({ trait, value: guess[trait], match: 'correct' });
    } else {
      feedback.push({ trait, value: guess[trait], match: 'incorrect' });
    }
  }

  return feedback;
}
