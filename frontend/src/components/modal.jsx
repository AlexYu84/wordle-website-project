import React from "react";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#222",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  zIndex: 1000,
  textAlign: "center",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
};

export default function Modal({ onClose }) {
  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h2>Congratulations!</h2>
        <p>You guessed the correct character!</p>
        <button onClick={onClose} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          Close
        </button>
      </div>
    </>
  );
}
