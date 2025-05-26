import React from 'react';
import './CharacterFeedback.css'; // Optional: if you're styling this component separately

const CharacterFeedback = ({ feedback }) => {
  return (
    <div className="feedback-grid">
      {feedback.map((f, idx) => (
        <div key={idx} className={`trait-box ${f.match}`}>
          <strong>{f.trait}</strong>: {String(f.value)}
        </div>
      ))}
    </div>
  );
};

export default CharacterFeedback;
