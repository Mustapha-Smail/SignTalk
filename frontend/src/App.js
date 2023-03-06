import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Alphabet, Home, Learn, QuizzChoice, QuizzLSF, QuizzFR, Search, Decomposition, Login, Register, Profile, History, Badges, Classement, Memory, Hanged } from './screens'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Login />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/alphabet' element={<Alphabet />}></Route>
        <Route path='/learn' element={<Learn />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/decomposition' element={<Decomposition />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/badges' element={<Badges />}></Route>
        <Route path='/classement' element={<Classement />}></Route>
        <Route path='/quizz' >
          <Route path='quizzlsf' element={<QuizzLSF />}>
            <Route path=':id' element={<QuizzLSF />}></Route>
          </Route>
          <Route path='quizzfr' element={<QuizzFR />}>
            <Route path=':id' element={<QuizzFR />}></Route>
          </Route>
          <Route path='' element={<QuizzChoice />}></Route>
        </Route>
        <Route path='/memory' element={<Memory />}></Route>
        <Route path='/hanged' element={<Hanged />}></Route>
      </Routes>
    </Router>
  )
}

export default App