import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'
import swal from 'sweetalert'

import './QuizzFR.css';


const QuizzFR = () => {

  const [checked, setChecked] = useState(false)
  const [quizz, setQuizz] = useState({
    word: 'word',
    multimedias: [

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

const notif = (e) => {
  let status = 'incorrect';
  const answer = e.target.value
  if (answer === quizz.correctMultimedia.url) {
      status = 'correct'
  }
  swal({
      title: status === 'correct' ? "Bien joué !" : "Oh non :-(",
      text: status === 'correct' ? "Tu as choisis la bonne réponse !" : "Tu as choisis la mauvaise réponse ! Reéssaies !",
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
      setChecked(false) 
  });
}

return (
  <>
    <div className="quizzfr__grid">
      <div className="quizzfr__content">
          <div className="st__quizz-word">
            <TextContainer content={quizz.word}/>
          </div>
      </div>
      <div className="quizzfr__media" onChange={(e) => notif(e)}>
        {quizz.multimedias.map((image, index)=> (
          <div className={`quizzfr__media-img${index} media-center`}>
            <ImageContainer imgSrc={image.url} imgAlt={image.type} className={"quizzfr__img"}/>
            <input name={image.url} checked={checked} type={'radio'} value={image.url} onChange={(e) => notif(e)}/>
          </div>
        ))}
      </div>

      <div className="quizzfr__button">
        <ButtonContainer onClickMethod={getData}/>
      </div>
    </div>
  </>
)
};

export default QuizzFR;