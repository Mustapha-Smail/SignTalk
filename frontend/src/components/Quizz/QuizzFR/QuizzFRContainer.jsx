import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'
import swal from 'sweetalert'

import './QuizzFR.css';


const QuizzFR = () => {

  const [quizz, setQuizz] = useState({
    word: 'word',
    multimedia: [

        {type: 'image', 
         url: '/images/header-img.png'
        },

        {type: 'image', 
         url: '/images/header-img.png'
        },

        {type: 'image', 
         url: '/images/header-img.png'
        },

        {type: 'image', 
         url: '/images/header-img.png'
        }
    ],
    correctMultimedia: 'word_3'
    
  })

 const getData = async () => {
    try {
    const {data}  = await axios.get(`api/dictionary/quizz/fr`)
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
  if (answer === quizz.correctMultimedia) {
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
        {quizz.multimedia.map((image, index)=> (
          <div className={`st__quizz-images${index}`} onClick={() => notif(image)}>
            <ImageContainer imgSrc={quizz.multimedia.url} imgAlt={quizz.multimedia.type}/>
          </div>
        ))}
      </div>
      <div className="st__quizz-content">
          <div className="st__quizz-word">
            <TextContainer content={quizz.word}/>
          </div>
      </div>
      <div className="st__quizz-button">
        <ButtonContainer onClickMethod={getData}/>
      </div>
    </div>
  </>
)
};

export default QuizzFR;