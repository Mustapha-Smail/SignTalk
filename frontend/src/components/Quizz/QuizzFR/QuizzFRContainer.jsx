import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'
import { notif } from '../../../utils'

import './QuizzFR.css';


const QuizzFR = () => {

  const [checked, setChecked] = useState(false)
  const [quizz, setQuizz] = useState({
    word: 'word',
    multimedias: [],
    correctMultimedia: 'videoId'
    
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


return (
  <>
    <div className="quizzfr__grid">
      <div className="quizzfr__content">
          <div className="st__quizz-word">
            <TextContainer content={quizz.word}/>
          </div>
      </div>
      <div className="quizzfr__media" onChange={(e) => notif(e, quizz, getData, setChecked)}>
        {quizz.multimedias.map((video, index)=> (
          <div className={`quizzfr__media-img${index} media-center`}>
            <ImageContainer videoId={video} className={"quizzfr__img"}/>
            <input name={video} checked={checked} type={'radio'} value={video} onChange={(e) => notif(e, quizz, getData, setChecked)}/>
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