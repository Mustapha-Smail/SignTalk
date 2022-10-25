import React from 'react'
import './DecompoCarousel.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ImageContainer, TextContainer } from '../../components';

const DecompoCarousel = ({letters}) => {
  return (
    <>
        <Carousel
            autoFocus={true}
            useKeyboardArrows={true}
            swipeable={true}
            infiniteLoop={true}
        >
            {letters?.filter(letter => !!letter).map((letter, index) => letter && (
                <div key={index}>
                    <ImageContainer imgSrc={letter.lsf.url} imgAlt={letter.name} type={letter.lsf.type}/>
                    <TextContainer content={letter.name}/>
                </div>
            ))}
            
        </Carousel>
    </>
  )
}

export default DecompoCarousel