import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './lsfHeader.css'
import { ImageContainer, TextContainer, ButtonContainer } from '../../../components'

const LsfHeader = () => {
    const [word, setWord] = useState({
        gloss: 'Learn',
        videoId: '99999999999999'
    })

    const getData = async () => {
        try {
            const response = await axios.post('/api/dictionary/random')
            const id = response.data.id
            const {data}  = await axios.get(`api/dictionary/${id}`)
            setWord(data)
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="st__lsfheader section__padding">
            <ImageContainer videoId={word.videoId}/>
            <TextContainer content={word.gloss}/>
            <ButtonContainer onClickMethod={getData}/>
        </div>
    )
}

export default LsfHeader