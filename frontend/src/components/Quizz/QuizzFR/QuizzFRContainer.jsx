import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'
import { notif } from '../../../utils'
import { Dropdown } from 'react-bootstrap'

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
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }


      const category = difficulte !== "Difficulté" ? difficulte : null
      const { data } = await axios.post(`/api/dictionary/quizz/fr`, { category }, config)
      setQuizz(data)
    } catch (err) {
      console.error(err);
    }
  }

  //Permit the synchronization
  useEffect(() => {
    getData()
  }, [difficulte])


  // Change the game difficulty 
  const changeDifficulty = (diff) => {
    setDifficulte(diff);
    getData();
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
                <Dropdown.Item onClick={() => changeDifficulty("facile")}>
                  facile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeDifficulty("moyen")}>
                  moyen
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeDifficulty("difficile")}>
                  difficile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="quizzfr__media" onChange={(e) => notif(e, quizz, getData, setChecked)}>
          {quizz.multimedias.map((video, index) => (
            <div className={`quizzfr__media-img${index} media-center`}>
              <ImageContainer videoId={video} className={"quizzfr__img"} />
              <input name={video} checked={checked} type={'radio'} value={video} onChange={(e) => notif(e, quizz, getData, setChecked)} />
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