import React from 'react'
import './QuizzFR.css'
import { QuizzFRContainer, Navbar } from '../../../components'


const QuizzFR = () => {
  return (
    <>
      <div className="gradient__bg">
        <Navbar />
        <QuizzFRContainer />
      </div>
    </>
  );
}

export default QuizzFR