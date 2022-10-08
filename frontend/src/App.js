import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Alphabet, Home, Learn, Quizz } from './screens'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Home/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/quizz' element={<Quizz/>}></Route>
        <Route path='/alphabet' element={<Alphabet/>}></Route>

        {/* ROUTE WITH OPTIONAL PARAMS v6 */}
        <Route path='/learn'>                      
          <Route path=':id' element={<Learn />} />  
          <Route path='' element={<Learn />} />  
        </Route> 

      </Routes>
    </Router>
  )
}

export default App