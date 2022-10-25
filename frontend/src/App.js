import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Alphabet, Home, Learn, QuizzChoice, QuizzLSF, QuizzFR } from './screens'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Home/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/quizz' element={<Quizz/>}></Route>
        <Route path='/alphabet' element={<Alphabet/>}></Route>
        <Route path='/learn' element={<Learn />}></Route>  
        <Route path='/quizz' >
          <Route path='quizzlsf' element={<QuizzLSF />}></Route>
          <Route path='quizzfr' element={<QuizzFR />}></Route>
          <Route path='' element={<QuizzChoice />}></Route>  
        </Route>  
          
      </Routes>
    </Router>
  )
}

export default App