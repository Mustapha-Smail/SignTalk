import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pendu.css";

const PenduGame = () => {
  const [word, setWord] = useState("");
  const [maskedWord, setMaskedWord] = useState("");
  const [usedLetters, setUsedLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(7);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const getWord = async () => {
      try {
        const response = await axios.get(
          "https://api.example.com/pendu/word"
        );
        const word = response.data.word.toLowerCase();
        setWord(word);
        setMaskedWord("*".repeat(word.length));
      } catch (error) {
        console.error(error);
      }
    };
    getWord();
  }, []);

  const handleGuess = (letter) => {
    if (!gameOver) {
      if (!usedLetters.includes(letter)) {
        const newUsedLetters = [...usedLetters, letter];
        setUsedLetters(newUsedLetters);
        if (word.includes(letter)) {
          let newMaskedWord = "";
          for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
              newMaskedWord += letter;
            } else {
              newMaskedWord += maskedWord[i];
            }
          }
          setMaskedWord(newMaskedWord);
          if (newMaskedWord === word) {
            setGameOver(true);
          }
        } else {
          setGuessesLeft(guessesLeft - 1);
          if (guessesLeft - 1 === 0) {
            setGameOver(true);
          }
        }
      }
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const renderGuessButton = (letter) => {
    const isDisabled = usedLetters.includes(letter) || gameOver;
    return (
      <button
        key={letter}
        className="pendu-guess-button"
        onClick={() => handleGuess(letter)}
        disabled={isDisabled}
      >
        {letter.toUpperCase()}
      </button>
    );
  };

  const renderGuessButtons = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return (
      <div className="pendu-guess-buttons">
        {alphabet.split("").map((letter) => renderGuessButton(letter))}
      </div>
    );
  };

  const renderMessage = () => {
    if (gameOver) {
      if (maskedWord === word) {
        return (
          <div className="pendu-message">
            Bravo, vous avez gagné !
            <button onClick={handleRestart}>Rejouer</button>
          </div>
        );
      } else {
        return (
          <div className="pendu-message">
            Dommage, vous avez perdu. Le mot était {word}.
            <button onClick={handleRestart}>Rejouer</button>
          </div>
        );
      }
    } else {
      return (
        <div className="pendu-message">
          Il vous reste {guessesLeft} essais.
        </div>
      );
    }
  };

  const renderPenduImage = () => {
    const imageIndex = 7 - guessesLeft;
    const renderedImage = `pendu${imageIndex}.jpg`;
    return (
    <div className="pendu-image-container">
    <img src={renderedImage} alt={`Pendu avec ${imageIndex} erreurs`} />
    </div>
    );
    };
    
    return (
    <div className="pendu-container">
    <h1>Jeu du Pendu</h1>
    <div className="pendu-word">{maskedWord}</div>
    {renderPenduImage()}
    {renderGuessButtons()}
    {renderMessage()}
    </div>
    );
    };
    
    export default PenduGame;
