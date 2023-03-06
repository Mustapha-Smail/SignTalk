import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HangedContainer.css";
import pendu from '../../components/Hanged/images/game0.png'
import pendu1 from '../../components/Hanged/images/game1.png'
import pendu2 from '../../components/Hanged/images/game2.png'
import pendu3 from '../../components/Hanged/images/game3.png'
import pendu4 from '../../components/Hanged/images/game4.png'
import pendu5 from '../../components/Hanged/images/game5.png'
import pendu6 from '../../components/Hanged/images/game6.png'
import pendu7 from '../../components/Hanged/images/game7.png'
import ImageContainer from "../elements/ImageContainer/ImageContainer";
import ButtonContainer from "../elements/ButtonContainer/ButtonContainer";

const HangedContainer = () => {
  const [word, setWord] = useState("");
  const [video, setVideo] = useState("");
  const [maskedWord, setMaskedWord] = useState("");
  const [usedLetters, setUsedLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(7);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const getWord = async () => {
      try {
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
            Perdu ! Le mot était : {word} 
          </div>
        );
      }
    } else {
      return (
        <div className="pendu-message">
          Il vous reste {guessesLeft} essais
        </div>
      );
    }
  };

  const renderPenduImage = () => {  
    const imageIndex = 7 - guessesLeft;
    var renderedImage = pendu
    switch (imageIndex) {
      case 1:
        renderedImage = pendu1;
        break;
      case 2:
        renderedImage = pendu2;
        break;
      case 3:
        renderedImage = pendu3;
        break;
      case 4:
        renderedImage = pendu4;
        break;
      case 5:
        renderedImage = pendu5;
        break;
      case 6:
        renderedImage = pendu6;
        break;
      case 7:
        renderedImage = pendu7; 
        break;
    }    
    
    return (
      <div className="pendu-image-container">
        <img class="pendu-image" src={renderedImage} alt={`Pendu avec ${imageIndex} erreurs`}  />
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
      <div className="pendu-word">{maskedWord}</div>
      {renderPenduImage()}
      {renderVideo()}
      {renderGuessButtons()}
      {renderMessage()}
      <ButtonContainer onClickMethod={handleRestart} />
    </div>
  );
};

export default HangedContainer;
