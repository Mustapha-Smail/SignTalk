import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'
import swal from 'sweetalert'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import './QuizzFR.css';


const QuizzFR = () => {

  const [difficulte, setDifficulte] = useState("Difficulté")
  const [checked, setChecked] = useState(false)
  const [quizz, setQuizz] = useState({
    word: 'word',
    multimedias: [],
    correctMultimedia: 'videoId'
  })

  const getData = async () => {
    try {
      const { data } = await axios.get(`api/dictionary/quizz/fr`)
      setQuizz(data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData()
  }, [])
 
  const changeDifficulty = (difficulte) => {
    getData(),
    setDifficulte(difficulte)
  }

  const notif = (e) => {
    let status = 'incorrect';
    const answer = e.target.value
    if (answer === quizz.correctMultimedia) {
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
    }).then(() => {
      getData()
      setChecked(false)
    });
  }

  return (
    <>
      <div className="quizzfr__grid">
        <div className="quizzfr__content">
          <div className="st__quizz-word">
            <TextContainer content={quizz.word} />
          </div>
          <div className="quizzfr__dropdown">
            <Dropdown>
              <Dropdown.Toggle>
                {difficulte}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>setDifficulte("Facile")}>
                  Facile
                </Dropdown.Item>
                <Dropdown.Item onClick={()=>setDifficulte("Moyen")}>
                  Moyen
                </Dropdown.Item>
                <Dropdown.Item onClick={()=>setDifficulte("Diffcile")}>
                  Difficile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="quizzfr__media" onChange={(e) => notif(e)}>
          {quizz.multimedias.map((video, index) => (
            <div className={`quizzfr__media-img${index} media-center`}>
              <ImageContainer videoId={video} className={"quizzfr__img"} />
              <input name={video} checked={checked} type={'radio'} value={video} onChange={(e) => notif(e)} />
            </div>
          ))}
        </div>

        <div className="quizzfr__button">
          <ButtonContainer onClickMethod={getData} />
        </div>
      </div>
    </>
  )
};

export default QuizzFR;