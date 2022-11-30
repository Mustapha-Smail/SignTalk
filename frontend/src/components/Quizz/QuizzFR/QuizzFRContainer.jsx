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
      
      /**
       * 
       * ça marche 
       * mais il y a un bug 
       * la première modif n'est pas prise en compte 
       * de plus je te suggère de mettre pause à tes modifs 
       * copier tout ce que t'as modifier 
       * faire un git pull de la dev 
       * merge la dev avec ta branche 
       * comme ça t'auras toutes autres refacto et perfs que j'ai mis et aussi la feature historique 
       * comme ça ensuite tu peux recopier tes modifs et continuer de taffer 
       * quand tu feras un pull request y aura pas de conflit 
       * ce que t'as pas commit 
       * et ce que t'as commit 
       * en soit ta feature
       */

      /**
       * Donc en gros je commit 
       * Puis fait un git merge depuis dev 
       * Et je pourrais continuer a taffer ? 
       * YES
       */
      const { data } = await axios.post(`/api/dictionary/quizz/fr`, {category}, config)
      setQuizz(data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData()
  }, [])


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
                {/* <Dropdown.Item onClick={()=>setDifficulte("Facile")}> */}
                <Dropdown.Item onClick={() => changeDifficulty("facile")}>
                  facile
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={()=>setDifficulte("Moyen")}> */}
                <Dropdown.Item onClick={() => changeDifficulty("moyen")}>
                  moyen
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={()=>setDifficulte("Diffcile")}> */}
                <Dropdown.Item onClick={() => changeDifficulty("difficile")}>
                  difficile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
          <ButtonContainer onClickMethod={getData} />
        </div>
      </div>
    </>
  )
};

export default QuizzFR;