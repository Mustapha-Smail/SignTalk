import React from 'react'
import './TextContainer.css'

const TextContainer = ({ content }) => {
  return (
    <div className='content__text'>
        {content}
    </div>
  )
}

export default TextContainer