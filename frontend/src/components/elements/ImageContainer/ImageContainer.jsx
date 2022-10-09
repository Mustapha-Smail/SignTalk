import React from 'react'
import './ImageContainer.css'

const ImageContainer = ({imgSrc, imgAlt, className}) => {
  return (
    <div className={`st__lsfheader-image ${className}`}>
        <img src={imgSrc} alt={imgAlt}/>
    </div>
  )
}

export default ImageContainer