import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import Links from './Links';

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
        <Links className={"st__navbar-links_container"}/>
      </div>
      <div className="st__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="st__navbar-menu_container scale-up-center">
          <Links className={"st__navbar-menu_container-links"}/>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
