import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'
import { notif } from '../../../utils'

import './QuizzLSFContainer.css';



const QuizzLSFContainer = () => {

  const [quizz, setQuizz] = useState({
    multimedia: 'videoId',
    words: ['word_1', 'word_2', 'word_3', 'word_4'], 
    correctWord: 'word_3'
    
  })

  const getData = async () => {
    try {
      const {data}  = await axios.post(`api/dictionary/quizz/lsf`)
      setQuizz(data)

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="st__quizz">
        <div className="st__quizz-image">
          <ImageContainer videoId={quizz.multimedia}/>
        </div>
        <div className="st__quizz-content">
          {quizz.words.map((word, index) => (
            <div className={`st__quizz-word${index}`} onClick={() => notif(word, quizz, getData)}>
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