import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  ImageContainer,
  TextContainer,
  ButtonContainer,
} from '../../components'
import { notif } from '../../utils'
import { Dropdown } from 'react-bootstrap'

import './MemoryContainer.css'
import { useParams } from 'react-router-dom'

const MemoryContainer = () => {
  const params = useParams()

  const id = params.id

  const [difficulte, setDifficulte] = useState('Difficulté')
  const [checked, setChecked] = useState(false)
  const [memory, setMemory] = useState({
    multimedia: [],
    words: ['word_1', 'word_2', 'word_3', 'word_4'],
  })

  const getData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      if (id) {
        const { data } = await axios.get(`/api/history/${id}`, config)
        console.log(data)
        setMemory(data.game.details)
      } else {
        const category = difficulte !== 'Difficulté' ? difficulte : null
        const { data } = await axios.post(
          `/api/dictionary/memory`,
          { category },
          config
        )
        setMemory(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  //Permit the synchronization
  useEffect(() => {
    getData()
  }, [difficulte])

  // Change the game difficulty
  const changeDifficulty = (diff) => {
    setDifficulte(diff)
    getData()
  }

  return (
    <>
      {/*<div className='quizzlsf__dropdown section__padding'>
        <Dropdown>
          <Dropdown.Toggle>{difficulte}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeDifficulty('facile')}>
              facile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeDifficulty('moyen')}>
              moyen
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeDifficulty('difficile')}>
              difficile
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>*/}
      <div className='st__quizz'>
      <div
          className='quizzfr__media'
          onChange={(e) => notif(e, memory, getData, setChecked)}
        >
          {memory.multimedia.map((video, index) => (
            <div className={`quizzfr__media-img${index} media-center`}>
              <ImageContainer
                videoId={video}
                className={'quizzfr__img'}
              />
              <input
                name={video}
                checked={checked}
                type={'radio'}
                value={video}
                onChange={(e) => notif(e, memory, getData, setChecked)}
              />
            </div>
          ))}
          </div>
        <div className='st__quizz-content'>
          {memory.words.map((word, index) => (
            <div className={`st__quizz-word${index}`}>
              <TextContainer content={word} />
              <input
                name={word}
                checked={checked}
                type={'radio'}
                value={word}
                 onChange={(e) => notif(e, memory, getData, setChecked)}
              />
            </div>
          ))}
        </div>
        <div className='st__quizz-button'>
          <ButtonContainer onClickMethod={getData} />
        </div>
      </div>
    </>
  )
}

export default MemoryContainer
