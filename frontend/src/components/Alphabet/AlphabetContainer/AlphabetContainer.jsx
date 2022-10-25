import React, { useState } from 'react'
import axios from 'axios'
import './alphabetContainer.css'
import { ImageContainer, TextContainer, AlphabetMenu, AlphabetMenuMobile } from '../../../components'

const Alphabet = () => {
    const [toggleMenu, setToggleMenu] = useState(false)

    const [letter, setLetter] = useState({
        name: 'Alphabet',
        lsf: {
            type: 'image', 
            url: '/images/header-img.png'
        }
    })
    
    const getLetter = async (id) => {
        try {
            const { data } = await axios.get(`/api/alphabet/${id}`)
            setLetter(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>  
            <div className='section__padding'>
                
                <div className='st__grid-mobile'>
                    <AlphabetMenuMobile 
                        toggleMenu={toggleMenu}
                        onClickFirstMethod={getLetter}
                        onClickSecondMethod={() => setToggleMenu(!toggleMenu)}
                    />
                </div>

                <div className="st__grid">
                    <div className='st__grid-alphabet'>
                        <AlphabetMenu onClickFirstMethod={getLetter} />
                    </div>
                    <div className='st__grid-lsf'>
                        <ImageContainer imgSrc={letter.lsf.url} imgAlt={letter.name} type={letter.lsf.type}/>
                        <TextContainer content={`${(letter.name).toUpperCase()} - ${(letter.name).toLowerCase()}`}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Alphabet