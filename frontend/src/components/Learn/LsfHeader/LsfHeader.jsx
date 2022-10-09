import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './lsfHeader.css'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'

const LsfHeader = () => {
    const [word, setWord] = useState({
        name: 'Learn',
        lsf: {
            type: 'image', 
            url: '/images/header-img.png'
        }
    })

    const getData = async () => {
        try {
            // get random id word 
            const response = await axios.get('/api/dictionary/random')
            const id = response.data.id
            // get word data 
            const {data}  = await axios.get(`api/dictionary/${id}`)
            setWord(data)

        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="st__lsfheader section__padding">
            <ImageContainer imgSrc={word.lsf.url} imgAlt={word.name}/>
            <TextContainer content={word.name}/>
            <ButtonContainer onClickMethod={getData}/>
        </div>
    )
}

export default LsfHeader