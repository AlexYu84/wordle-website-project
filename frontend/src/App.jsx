import React from "react";
import CharacterGuessForm from "./components/characterGuessForm";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>DC Character Wordle</h1>
      <CharacterGuessForm />
    </div>
  );
}

export default App;
