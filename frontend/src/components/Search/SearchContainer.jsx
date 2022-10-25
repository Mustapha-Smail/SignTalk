import React from 'react'
import { ImageContainer, TextContainer } from '../../components'

const SearchContainer = ({ word }) => {
  return (
    <>
      <ImageContainer videoId={word.videoId}/>
      <TextContainer content={word.gloss}/>
    </>
  )
}

export default SearchContainer