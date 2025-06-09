import React, {useState} from "react";
import Confetti from "react-confetti";
import CharacterGuessForm from "./components/characterGuessForm";
import Modal from "./components/modal";
import './App.css';


function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleWin = () => {
    setShowConfetti(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowConfetti(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", width: "100%", color: "red" }}>
      <h1>DC Character Wordle</h1>
      {showConfetti && <Confetti />}
      {showModal && <Modal onClose={handleCloseModal} />}
      <CharacterGuessForm onWin={handleWin} />
    </div>
  );
}

export default App;