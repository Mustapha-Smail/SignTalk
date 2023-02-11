import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  ImageContainer,
  TextContainer,
  ButtonContainer,
  ImageContainerMemory,
} from '../../components'
import { notif } from '../../utils'
import { Dropdown } from 'react-bootstrap'

import './MemoryContainer.css'
import { useParams } from 'react-router-dom'


const shuffle =(array) => {
  const shuffledArray = array.slice().sort(() => Math.random() - 0.5)
  return shuffledArray
}

const MemoryContainer = () => {
  const params = useParams()

  const id = params.id

  const [difficulte, setDifficulte] = useState('Difficulté')
  const [checked, setChecked] = useState(false)
  //const [shuffledWords, setShuffledWords] = useState([])
  //const [shuffledvideo, setShuffledvideo] = useState([])
  const [shuffled, setShuffled] = useState([])
  const [memory, setMemory] = useState({
    //multimedia: [],
    //words: ['word_1', 'word_2', 'word_3', 'word_4'],
    pair: []
  })

  //const [flipped, setFlipped] = useState(Array(memory.words.length).fill(true))
  //const [flippedv, setFlippedv] = useState(Array(memory.multimedia.length).fill(true))
  const [flipped, setFlipped] = useState(Array(memory.pair.length).fill(true))
  const [flippedi, setFlippedi] = useState(Array(memory.pair.length).fill(true))
  const [totalFlips, setTotalFlips] = useState(0);

  const handleFlip = (index, type) => {
    console.log(`index: ${index}, type: ${type}`);
    if(type === 'imagevideo' )
    {
      const newFlipped = [...flipped]
      newFlipped[index] = !newFlipped[index]
      setFlipped(newFlipped)
      setTotalFlips(totalFlips + 1);console.log()
    }
    else if(type === 'imagemot'){
      const newFlippedi = [...flippedi]
      newFlippedi[index] = !newFlippedi[index]
      setFlippedi(newFlippedi)
      setTotalFlips(totalFlips + 1);console.log()
    }


    if (totalFlips === 2) {
      //ce sont les mêmes
    } else {
      //différents
    }
  }


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

    //setFlipped(Array(memory.words.length).fill(true));
    //setFlippedv(Array(memory.multimedia.length).fill(false));
    setFlipped(Array(memory.pair.length).fill(false));
  }

  /*useEffect(() => {
    setShuffledWords(shuffle(memory.words))
  }, [memory.words])*/

  /*useEffect(() => {
    setShuffledvideo(shuffle(memory.multimedia))
  }, [memory.multimedia])*/

  useEffect(() => {
    setShuffled(shuffle(memory.pair))
  }, [memory.pair])

  //Permit the synchronization
  useEffect(() => {
    getData()
  }, [difficulte])  

  // Change the game difficulty
  const changeDifficulty = (diff) => {
    setDifficulte(diff)
    getData()
  }

  console.log(shuffled);


  
  return (
    <>
      {<div className='quizzlsf__dropdown section__padding'>
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
      </div>}
      <div className='st__quizz'>
        <div
          className='quizzfr__media'
          onChange={(e) => notif(e, memory, getData, setChecked)}
        >
          {shuffled.map((pair, index) => (
            <>
              <div className={`quizzfr__media-img${index} media-center` } onClick={() => handleFlip(index, "imagevideo")} >
                {flipped[index] ? <ImageContainer videoId={pair.videoId} className={'quizzfr__img'}/> : <ImageContainerMemory type={'imagevideo'} imgSrc={'/images/SIGN.png'}/>}
                <input
                  name={pair}
                  checked={checked}
                  type={'radio'}
                  value={pair}
                  onChange={(e) => notif(e, memory, getData, setChecked)}
                />
              </div>
              <div className={`quizzfr__media-img${index} media-center` } onClick={() => handleFlip(index, "imagemot")} >
                {flippedi[index] ? <TextContainer content={pair.gloss} /> : <ImageContainerMemory type={'imagemot'} imgSrc={'/images/SIGN.png'}/>}
              </div>
            </>
          ))}
          </div>
     {/*<div className='st__quizz-content'>
          {shuffled.map((word, index) => (
            <div className={`st__quizz-word${index}`} onClick={() => handleFlip(index)}>
              {flipped[index] ? <ImageContainer type={'image'} imgSrc={'/images/SIGN.png'} /> : <TextContainer content={word} />}
              
              <input
                name={word}
                checked={checked}
                type={'radio'}
                value={word}
                 onChange={(e) => notif(e, memory, getData, setChecked)}
              />
            </div>
          ))}
        </div>*/}
        <div className='st__quizz-button'>
          <ButtonContainer onClickMethod={getData} />
        </div>
      </div>
    </>
  )
}

export default MemoryContainer
