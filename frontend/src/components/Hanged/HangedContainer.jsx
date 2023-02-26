import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HangedContainer.css";
import ImageContainer from "../elements/ImageContainer/ImageContainer";

const HangedContainer = () => {
  const [word, setWord] = useState("");
  const [video, setVideo] = useState("");
  const [maskedWord, setMaskedWord] = useState("");
  const [usedLetters, setUsedLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(7);
  const [gameOver, setGameOver] = useState(false);

  // const getLetter = async (id) => {
  //   try {
  //       const { data } = await axios.get(`/api/alphabet/${id}`)
  //       setLetter(data)
  //   } catch (error) {
  //       console.error(error)
  //   }

  useEffect(() => {
    const getWord = async () => {
      try {

        // const response = await axios.get(
        //   "https://random-word-api.herokuapp.com/word"
        //   );
        // const word = response.data[0]
        // setWord(word);
        // setMaskedWord("*".repeat(word.length));
        const response = await axios.post('/api/dictionary/random')
        const id = response.data.id
        const { data } = await axios.get(`api/dictionary/${id}`)
        const word = data.gloss
        const video = data.videoId
        setWord(word)
        setVideo(video)
        console.log(response.data);
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
    const alphabet = "abcdefghijklmnopqrstuvwxyz'-";
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
    const renderedImage = `../../components/Hanged/images/game${imageIndex}.png`;
    return (
      <div className="pendu-image-container">
        <img src={renderedImage} alt={`Pendu avec ${imageIndex} erreurs`} />
      </div>
    );
  };

  const renderVideo = () => {
    return (
      <div className="pendu-video-word">
        <ImageContainer videoId={video} />
      </div>
    );
  };


  return (
    <div className="pendu-container">
      <h1>Jeu du Pendu</h1>
      <div className="pendu-word">{maskedWord}</div>
      {renderPenduImage()}
      {renderVideo()}
      {renderGuessButtons()}
      {renderMessage()}
    </div>
  );
};

export default HangedContainer;
