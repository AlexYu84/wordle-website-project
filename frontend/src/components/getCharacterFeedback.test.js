import { getCharacterFeedback } from '../utils/getCharacterFeedback';

describe('getCharacterFeedback', () => {
  const target = {
    name: 'Batman',
    alignment: 'hero',
    hasPowers: false,
    city: 'Gotham City',
    origin: 'earth',
    weaponType: 'gadgets',
    species: 'human'
  };

  it('should return all correct when guess is exact match', () => {
    const guess = { ...target };
    const feedback = getCharacterFeedback(guess, target);
    expect(feedback.every(f => f.match === 'correct')).toBe(true);
  });

  it('should return partial or incorrect for mismatched values', () => {
    const guess = {
      name: 'Superman',
      alignment: 'hero',
      hasPowers: true,
      city: 'Metropolis',
      origin: 'krypton',
      weaponType: 'none',
      species: 'kryptonian'
    };
    const feedback = getCharacterFeedback(guess, target);
    expect(feedback.some(f => f.match !== 'correct')).toBe(true);
  });
});
