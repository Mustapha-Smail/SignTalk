import React from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'

const Header = () => {
  const navigate = useNavigate()

  return (   
    <div className="st__header section__padding" id="home">
      <div className="st__header-content">
        <h1 className="gradient__text">Apprendre la LSF avec SignTalk n’a jamais été  aussi facile</h1>
        <p>Apprendre une nouvelle langue est toujours une expérience enrichissante, c'est pourquoi nous proposons déjà notre application SignTalk qui sera un 
          guide pour vous aider à vous épanouir linguistiquement!  </p>

        <div className="st__header-content__input">
          <button type="button" onClick={() => navigate('/learn')}>C'est parti!</button>
        </div>

        <div className="st__header-content__people">
          <img src="/images/people.png" alt='people' />
          <p>1,600 personnes ont déjà commencé à apprendre la LSF grâce à SignTalk</p>
        </div>
      </div>

      <div className="st__header-image">
        <img src="/images/header-img.png" alt='SignTalk Logo' />
      </div>
    </div>
  )
};

export default Header;
