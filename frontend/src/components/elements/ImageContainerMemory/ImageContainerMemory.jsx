import React from 'react'
import './ImageContainerMemory.css'
import {Video} from 'cloudinary-react';

const ImageContainerMemory = ({imgSrc, imgAlt, className, type, videoId}) => {
  return (
    <div className={`st__lsfheader-image ${className}`}>
        {(type && type==='imagemot') || type==='imagevideo' ? (
          <img src={imgSrc} alt={imgAlt}/>
        ) : (
          <Video
            cloudName={process.env.REACT_APP_CLOUD_NAME}
            publicId={process.env.REACT_APP_CLOUD_URL + videoId}
            controls
            autoPlay
            loop
            muted
          >
          </Video>
        )}
        
    </div>
  )
}

export default ImageContainerMemory