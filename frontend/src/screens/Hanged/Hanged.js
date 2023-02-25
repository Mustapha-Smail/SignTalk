import React, { useState, useEffect } from "react";
import './Hanged.css'
import { HangedContainer, Navbar } from '../../components'
import myImage from '../../../public/images/hanged/game1.png'

const PENDU_IMAGES = [  "../../../public/images/hanged/game1.jpg",  "../../../public/images/hanged/game2.jpg",  "../../../public/images/hanged/game3.jpg",  "../../../public/images/hanged/game4.jpg",  "../../../public/images/hanged/game5.jpg",  "../../../public/images/hanged/game6.jpg",  "../../../public/images/hanged/game7.jpg",];


const Hanged = () => {
  // const [word, setWord] = useState("");
  // const [maskedWord, setMaskedWord] = useState("");
  // const [wrongGuesses, setWrongGuesses] = useState(0);
  // const [gameOver, setGameOver] = useState(false);

  // const fetchWord = async () => {
  //   const response = await fetch("https://random-word-api.herokuapp.com/all");
  //   const data = await response.json();
  //   const randomIndex = Math.floor(Math.random() * data.length);
  //   setWord(data[randomIndex]);
  // };

  // const handleGuess = (letter) => {
  //   if (word.includes(letter)) {
  //     const newMaskedWord = word
  //       .split("")
  //       .map((char) => (char === letter ? char : "_"))
  //       .join("");
  //     setMaskedWord(newMaskedWord);
  //     if (!newMaskedWord.includes("_")) {
  //       setGameOver(true);
  //     }
  //   } else {
  //     setWrongGuesses(wrongGuesses + 1);
  //     if (wrongGuesses === PENDU_IMAGES.length - 1) {
  //       setGameOver(true);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchWord();
  // }, []);

  // useEffect(() => {
  //   if (word) {
  //     setMaskedWord(word.split("").map(() => "_").join(""));
  //   }
  // }, [word]);

  // const renderGuessButton = (letter) => {
  //   return (
  //     <button onClick={() => handleGuess(letter)} disabled={gameOver}>
  //       {letter}
  //     </button>
  //   );
  // };

  // const renderPenduImage = () => {
  //   return <img src={PENDU_IMAGES[wrongGuesses]} alt="Pendu" />;
  // };

  // const renderMaskedWord = () => {
  //   return (
  //     <div>
  //       {maskedWord.split("").map((char, index) => (
  //         <span key={index}>{char} </span>
  //       ))}
  //     </div>
  //   );
  // };

  // const renderGameOver = () => {
  //   if (gameOver) {
  //     return <div>Game over!</div>;
  //   } else {
  //     return null;
  //   }
  // };

  // return (
  //   <div>
  //     <Navbar/>
  //     <HangedContainer/>
      
  //     <div>{renderPenduImage()}</div>
  //     <div>{renderMaskedWord()}</div>
  //     <div>{renderGameOver()}</div> 
  //     <div>
  //       {renderGuessButton("A")}
  //       {renderGuessButton("B")}
  //       {renderGuessButton("C")}
  //       {renderGuessButton("D")}
  //       {renderGuessButton("E")}
  //       {renderGuessButton("F")}
  //       {renderGuessButton("G")}
  //       {renderGuessButton("H")}
  //       {renderGuessButton("I")}
  //       {renderGuessButton("J")}
  //       {renderGuessButton("K")}
  //       {renderGuessButton("L")}
  //       {renderGuessButton("M")}
  //       {renderGuessButton("N")}
  //       {renderGuessButton("O")}
  //       {renderGuessButton("P")}
  //       {renderGuessButton("Q")}
  //       {renderGuessButton("R")}
  //       {renderGuessButton("S")}
  //       {renderGuessButton("T")}
  //       {renderGuessButton("U")}
  //       {renderGuessButton("V")}
  //       {renderGuessButton("W")}
  //       {renderGuessButton("X")}
  //       {renderGuessButton("Y")}
  //       {renderGuessButton("Z")}
  //   </div> 

  return (
    <div>
      <Navbar/>
      <HangedContainer/>
      <img src={myImage}></img>
    </div>);
};

export default Hanged