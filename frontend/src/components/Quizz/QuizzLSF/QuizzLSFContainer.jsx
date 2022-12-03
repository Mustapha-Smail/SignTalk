import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'
import { notif } from '../../../utils'
import { Dropdown } from 'react-bootstrap'

import './QuizzLSFContainer.css';



const QuizzLSFContainer = () => {

  const [difficulte, setDifficulte] = useState("Difficulté")
  const [quizz, setQuizz] = useState({
    multimedia: 'videoId',
    words: ['word_1', 'word_2', 'word_3', 'word_4'],
    correctWord: 'word_3'

  })
  
  const getData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const category = difficulte !== "Difficulté" ? difficulte : null
      const { data } = await axios.post(`/api/dictionary/quizz/lsf`, { category }, config)
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
        <div className="quizzlsf__dropdown">
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
      <div className="st__quizz">
        <div className="st__quizz-image">
          <ImageContainer videoId={quizz.multimedia} />
        </div>
        <div className="st__quizz-content">
          {quizz.words.map((word, index) => (
            <div className={`st__quizz-word${index}`} onClick={() => notif(word, quizz, getData)}>
              <TextContainer content={word} />
            </div>
          ))}
        </div>
        <div className="st__quizz-button">
          <ButtonContainer onClickMethod={getData} />
        </div>
      </div>
    </>
  )
};

export default QuizzLSFContainer;