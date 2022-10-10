import React from 'react'
import './QuizzLSF.css'
import { QuizzLSFContainer, Navbar } from '../../../components'


const QuizzLSF = () => {
  return (
    <>
      <div className="gradient__bg">
        <Navbar />
        <QuizzLSFContainer />
      </div>
    </>
  );
}

export default QuizzLSF