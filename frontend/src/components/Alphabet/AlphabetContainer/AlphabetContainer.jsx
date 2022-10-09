import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './alphabetContainer.css'
import { ImageContainer, TextContainer, AlphabetMenu, AlphabetMenuMobile } from '../../../components'

const Alphabet = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [alphabet, setAlphabet] = useState([])

    const [letter, setLetter] = useState({
        name: 'Alphabet',
        lsf: {
            type: 'image', 
            url: '/images/header-img.png'
        }
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/api/alphabet')
                setAlphabet(data)
            } catch (error) {
                console.error(error)
            }
        }
        getData()
    }, [alphabet])
    
    const getLetter = async (id) => {
        try {
            const { data } = await axios.get(`/api/alphabet/${id}`)
            setLetter(data)
            console.log(letter)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>  
            <div className='section__padding'>
                
                <div className='st__grid-mobile'>
                    <AlphabetMenuMobile 
                        alphabet={alphabet}
                        toggleMenu={toggleMenu}
                        onClickFirstMethod={getLetter}
                        onClickSecondMethod={() => setToggleMenu(!toggleMenu)}
                    />
                </div>

                <div className="st__grid">
                    <div className='st__grid-alphabet'>
                        <AlphabetMenu alphabet={alphabet} onClickFirstMethod={getLetter} />
                    </div>
                    <div className='st__grid-lsf'>
                        <ImageContainer imgSrc={letter.lsf.url} imgAlt={letter.name} />
                        <TextContainer content={`${(letter.name).toUpperCase()} - ${(letter.name).toLowerCase()}`}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Alphabet