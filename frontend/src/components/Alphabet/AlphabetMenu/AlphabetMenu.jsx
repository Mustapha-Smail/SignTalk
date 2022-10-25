import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AlphabetMenu.css'

const AlphabetMenu = ({onClickFirstMethod, onClickSecondMethod}) => {
    const [alphabet, setAlphabet] = useState([])
    
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

    return (
        <>
            <h3>Alphabet</h3>
            <div className='alphabet-list'>
                <ul>
                    {alphabet.map(letter => (
                        <li onClick={() => {onClickFirstMethod(letter._id); onClickSecondMethod()}}>
                            {(letter.name).toUpperCase()} - {(letter.name).toLowerCase()}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default AlphabetMenu