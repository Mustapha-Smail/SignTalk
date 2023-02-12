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


const shuffle = (array) => {
  console.log(array)
  const shuffledArray = array.slice().sort(() => Math.random() - 0.5)
  console.log(shuffledArray)
  return shuffledArray
}

const separate = (pair) => {
  const separatedArray = []; 

  pair.forEach((pair, index) => {
    separatedArray.push({index: index, value: pair.gloss, type: "mot", retourn: false});
    separatedArray.push({index: index, value: pair.videoId, type: "video", retourn: false});
  });

  return separatedArray 
}



const MemoryContainer = () => {
  const params = useParams()

  const id = params.id

  const [difficulte, setDifficulte] = useState('Difficulté')
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
  const [firstcard, setfirstcard] = useState(-1);
  const [selectedCards, setSelectedCards] = useState([]);


  const incrementFlip = () => {
    setTotalFlips(totalFlips + 1);
  }

  const handleFlip = (index, type, id) => {
    console.log(`index: ${index}, type: ${type}`);
    if(type === 'imagevideo' && !flipped[index])
    {
      const newFlipped = [...flipped]
      newFlipped[index] = !newFlipped[index]
      setFlipped(newFlipped)
      incrementFlip()
      if(firstcard === -1 )
      {
        setfirstcard(id);
      }
      setSelectedCards([...selectedCards, index]);
    }
    else if(type === 'imagemot' && !flippedi[index]){
      const newFlippedi = [...flippedi]
      newFlippedi[index] = !newFlippedi[index]
      setFlippedi(newFlippedi)
      incrementFlip()
      if(firstcard === -1 )
      {
        setfirstcard(id);
      }
      setSelectedCards([...selectedCards, index])
    }
console.log(firstcard)
console.log(id)
    if (totalFlips === 1 && firstcard === id) {
      //ce sont les mêmes
      console.log("je suis ici")
      resetchoice()
    } else if(totalFlips===1){
      setFlipped(flipped.map((isFlipped, i) => (selectedCards.includes(i) ? false : isFlipped)));
      setFlippedi(flippedi.map((isFlippedi, i) => (selectedCards.includes(i) ? false : isFlippedi)));
      console.log("je suis ici hihihhi")
      resetchoice()
    }
  }


  const resetchoice = () =>{
    setTotalFlips(0);
    setfirstcard(-1);
    setSelectedCards([]);
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

    setFlipped(Array(memory.pair.length).fill(false));
    setFlippedi(Array(memory.pair.length).fill(false));
  }




  useEffect(() => {
    const newarray = separate(memory.pair)
    setShuffled(shuffle(newarray))
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

  //console.log(shuffled);


  
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
        <div className='quizzfr__media'>
          {shuffled.map((pair, index) => (
            <div key={index}>
              {pair.type === "video" ? (
              <div className={`quizzfr__media-img${index} media-center` } onClick={() => handleFlip(index, "imagevideo", pair.index)} >
                {flipped[index] ? <ImageContainer videoId={pair.value} className={'quizzfr__img'}/> : <ImageContainerMemory type={'imagevideo'} imgSrc={'/images/SIGN.png'}/>}
              </div>
              ) : (
              <div className={`quizzfr__media-img${index} media-center` } onClick={() => handleFlip(index, "imagemot", pair.index)} >
                {flippedi[index] ? <TextContainer content={pair.value} /> : <ImageContainerMemory type={'imagemot'} imgSrc={'/images/SIGN.png'}/>}
              </div>
              )}
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
