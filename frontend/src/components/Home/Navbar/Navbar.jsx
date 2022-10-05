import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="st__navbar">
      <div className="st__navbar-links">
        <div className="st__navbar-links_logo">
          <h1>
            <Link to='/'> SignTalk </Link> 
          </h1>
        </div>
        <div className="st__navbar-links_container">
          <p><Link to='/'>Accueil</Link></p>
          <p><Link to='/learn'>Apprendre</Link></p>
          <p><Link to='/alphabet'>Alphabet</Link></p>
          <p><Link to='/'>Quizz</Link></p>
          <p><Link to='/'>Nous contacter</Link></p>
        </div>
      </div>
      <div className="st__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="st__navbar-menu_container scale-up-center">
          <div className="st__navbar-menu_container-links">
            <p><Link to='/'>Accueil</Link></p>
            <p><Link to='/learn'>Apprendre</Link></p>
            <p><Link to='/alphabet'>Alphabet</Link></p>
            <p><Link to='/'>Quizz</Link></p>
            <p><Link to='/'>Nous contacter</Link></p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
