import React from 'react'
import { BsArrowCounterclockwise } from 'react-icons/bs';

import './ButtonContainer.css'

const ButtonContainer = ({onClickMethod}) => {
  return (
    <button onClick={onClickMethod} className='st__lsfheader-button'>
        <BsArrowCounterclockwise className='random-icon'/>
    </button>
  )
}

export default ButtonContainer