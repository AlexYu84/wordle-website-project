import React from "react";
import "./CharacterFeedback.css"; // assuming this is your CSS file

export default function CharacterFeedback({ feedback }) {
  return (
    <div className="feedback-row">
      {feedback.map((f, index) => (
        <div key={index} style={{animationDelay: `${index * 0.2}s`}} className={`feedback-item ${f.match}`}>
          <strong>{f.trait}:</strong> {String(f.value)}
        </div>
      ))}
    </div>
  );
}
