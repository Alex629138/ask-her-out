import './App.css';
import { useState } from 'react';
import Confetti from 'react-confetti';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (answer) => {
    if (answer === "Yes") {
      setShowConfetti(true);
      setResponseMessage("Yay! I can't wait 🥰");
    } else {
      setResponseMessage("Thanks for your answer! ❤️");
    }

    fetch("https://formspree.io/f/xgvadkpq", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
      body: JSON.stringify({
        answer: answer,
      })
    }).then(() => {
      setSubmitted(true);
    });
  };

  return (
    <div className="container">
      <h1>Hey Katherine,</h1>
      <p>I have something to ask you...</p>
      <h2>Would you like to go on a date with me?</h2>

      {showConfetti && <Confetti />} {/* Show confetti when "Yes" is clicked */}

      {!submitted ? (
        <div className="buttons">
          <button onClick={() => handleSubmit("Yes")}>Yes</button>
          <button onClick={() => handleSubmit("No")}>No</button>
        </div>
      ) : (
        <p className="response">{responseMessage}</p>
      )}
    </div>
  );
}

export default App;
