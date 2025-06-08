import React from 'react';
import './characterFeedback.css'; 

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
