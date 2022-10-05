import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { BsArrowCounterclockwise } from 'react-icons/bs';

import './lsfHeader.css'

const LsfHeader = () => {

    const navigate = useNavigate()
    const params = useParams()
    const [word, setWord] = useState({
        name: 'Learn',
        lsf: {
            type: 'image', 
            url: '/images/header-img.png'
        }
    })

    const getData = async (id) => {
        try {
        const {data}  = await axios.get(`api/dictionary/${id}`)
        setWord(data)

        } catch (err) {
        console.error(err);
        }
    }
    
    useEffect(() => {
        getData(params.id)
    }, [params.id, word])
    

    const getRandomWord = async () => {
        try {
        const { data } = await axios.get('/api/dictionary/random')
        navigate(`/learn/${data.id}`)
        } catch (err) {
        console.error(err);
        }
    }

    return (
        <div className="st__lsfheader section__padding">
            <div className='st__lsfheader-image'>
                <img src={word.lsf.url} alt={word.name}/>
            </div>

            <div className='st__lsfheader-content'>
                <div className='content__text'>
                    {word.name}
                </div>

                <button onClick={getRandomWord}>
                    <BsArrowCounterclockwise className='random-icon'/>
                </button>
            </div>

        </div>
    )
}

export default LsfHeader