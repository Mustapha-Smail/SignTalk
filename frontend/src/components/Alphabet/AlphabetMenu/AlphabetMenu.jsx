import React from 'react'
import './AlphabetMenu.css'

const AlphabetMenu = ({alphabet, onClickFirstMethod, onClickSecondMethod}) => {

    
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