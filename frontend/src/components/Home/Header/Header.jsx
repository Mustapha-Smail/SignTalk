import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './header.css';

const Header = () => {

  
  const navigate = useNavigate()


  const getRandomWord = async () => {
    try {
      const { data } = await axios.get('/api/dictionary/random')
      navigate(`/learn/${data.id}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (   
    <div className="st__header section__padding" id="home">
      <div className="st__header-content">
        <h1 className="gradient__text">Apprendre la LSF avec SignTalk n’a jamais été  aussi facile</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas ligula eget feugiat. Pellentesque id finibus odio, a vehicula nulla. Morbi id ex at nulla scelerisque consectetur eu at ante.</p>

        <div className="st__header-content__input">
          <button type="button" onClick={getRandomWord}>C'est parti!</button>
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
