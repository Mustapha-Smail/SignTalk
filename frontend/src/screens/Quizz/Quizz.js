import React from 'react'
import { Navbar } from '../../components'
import QuizzButton from '../../components/Quizz/QuizzButton'

const Quizz = () => {
  return (
    <>
      <div className="gradient__bg">
        <Navbar />
        <div>
          <QuizzButton text="4 images 1 mot" page="quizzfr" />
        </div>
        <div>
          <QuizzButton text="4 mots 1 image" page="quizzlsf" />
        </div>
      </div>
    </>
  )
}

export default Quizz