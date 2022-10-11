import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'
import './QuizzLSFContainer.css';


const QuizzLSFContainer = () => {

  const [quizz, setQuizz] = useState({
    multimedia: {
        type: 'image', 
        url: '/images/header-img.png'
    },
    words: ['word_1', 'word_2', 'word_3', 'word_4'], 
    correctWord: 'word_3'
    
  })

  const getData = async () => {
    try {
      const {data}  = await axios.get(`api/dictionary/quizz/lsf`)
      setQuizz(data)

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const notif = (answer) => {
    let status = 'incorrect'; 
    if (answer === quizz.correctWord) {
        status = 'correct'
    }
    swal({
        title: status === 'correct' ? "Bien joué!" : "Oh non :-(",
        text: status === 'correct' ? "Tu as choisi la bonne réponse!" : "Tu as choisi la mauvaise réponse!",
        icon: status === 'correct' ? "success" : "error",
        button: {
            text: "Suivant",
            value: true,
            visible: true,
            className: status === 'correct' ? "green-bg" : "red-bg",
            closeModal: true,
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    }).then(()=>{
        getData()
    });
  }

  return (
    <>
      <div className="st__quizz">
        <div className="st__quizz-image">
          <ImageContainer imgSrc={quizz.multimedia.url} imgAlt={quizz.multimedia.type}/>
        </div>
        <div className="st__quizz-content">
          {quizz.words.map((word, index) => (
            <div className={`st__quizz-word${index}`} onClick={() => notif(word)}>
              <TextContainer content={word}/>
            </div>
          ))}
        </div>
        <div className="st__quizz-button">
          <ButtonContainer onClickMethod={getData}/>
        </div>
      </div>
    </>
  )
};

export default QuizzLSFContainer;