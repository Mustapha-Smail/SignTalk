import React from 'react';
import Feature from '../Feature/Feature';
import './WhatSignTalk.css';

const WhatSignTalk = () => (
  <div className="st__whatSignTalk section__margin" id="fonctionnalites">
   
    <div className="st__whatSignTalk-heading">
    
      <h1 className="gradient__text"> Plus qu’une application, 
      Une nouvelle communication</h1></div>

      
    <div className="st__whatSignTalk-heading">
    
    <h3 className="logo">  <img src="/images/logo.png" alt="upn" /></h3></div>

    <div className="st__whatSignTalk-container">
      <Feature title="Apprentissage" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas ligula eget feugiat." />
      <Feature title="Gamification" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas ligula eget feugiat." />
      <Feature title="Communication" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas ligula eget feugiat." />
    </div>
  </div>
);

export default WhatSignTalk;
