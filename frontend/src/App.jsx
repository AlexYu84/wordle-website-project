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

// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     fetch("http://localhost:3000/api/characters") // or your actual backend port
//       .then((res) => res.json())
//       .then((data) => console.log("Characters from backend:", data))
//       .catch((err) => console.error("Error connecting to backend:", err));
//   }, []);

//   return <div>Check your console to see if it connected!</div>;
// }

// export default App;
