import React from 'react'
import { Link } from 'react-router-dom'

const Links = ({ className }) => {
  return (
    <div className={className}>
        <p><Link to='/'>Accueil</Link></p>
        <p><Link to='/learn'>Apprendre</Link></p>
        <p><Link to='/alphabet'>Alphabet</Link></p>
        <p><Link to='/search'>Rechercher</Link></p>
        <p><Link to='/quizz'>Quizz</Link></p>
        <p><Link to='/'>Nous contacter</Link></p>
    </div>
  )
}

export default Links