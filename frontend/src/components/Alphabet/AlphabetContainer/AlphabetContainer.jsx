import React, { useState, useEffect } from 'react'
import { RiCloseLine } from 'react-icons/ri';
import { TiSortAlphabeticallyOutline } from 'react-icons/ti';
import axios from 'axios'
import './alphabetContainer.css'

const Alphabet = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [zindex, setZindex] = useState(false)
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

    const getMenu = () => {
        setToggleMenu(!toggleMenu)
        setZindex(!zindex)
    }

    return (
        <div className='st__grid section__padding'>
            <div className='st__grid-alphabet'>
                <h3>Alphabet</h3>
                <ul>
                    {alphabet.map(letter => (
                        <li onClick={() => getLetter(letter._id)}>
                            {(letter.name).toUpperCase()} - {(letter.name).toLowerCase()} 
                        </li>
                    ))}
                </ul>
            </div>
            <div className={zindex ? 'st__grid-lsf z-index__lsf' : 'st__grid-lsf'}>
                <div className='st__lsfheader-image'>
                    <img src={letter.lsf.url} alt={letter.name}/>
                </div>

                <div className='st__lsfheader-content'>
                    <div className='content__text'>
                        {(letter.name).toUpperCase()} - {(letter.name).toLowerCase()}
                    </div>
                </div>
            </div>

            <div className="st__grid-menu">
                {toggleMenu
                ? <RiCloseLine color="#fff" size={27} onClick={() => getMenu()} />
                : <TiSortAlphabeticallyOutline color="#fff" size={27} onClick={() => getMenu()} />}
                {toggleMenu && (
                <div className="st__grid-menu-alphabet scale-up-center">
                <div className="st__grid-menu_container-links">
                    <h3>Alphabet</h3>
                    <ul>
                        {alphabet.map(letter => (
                            <li onClick={() => {getLetter(letter._id); getMenu();}}>
                                {(letter.name).toUpperCase()} - {(letter.name).toLowerCase()} 
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
                )}
            </div>

        </div>
    )
}

export default Alphabet