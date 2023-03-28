import React from 'react';
import './footer.css';

const Footer = () => (
  <div className="st__footer section__padding">
    <div className="st__footer-heading">
      <h1 className="gradient__text">Envie d’en savoir plus sur nos valeurs?</h1>
    </div>

    <div className="st__footer-btn">
      <p>Contactez nous</p>
    </div>

    <div className="st__footer-links">
      <div className="st__footer-links_logo">
      <img src="/images/logo.jpg" alt="upn" /> <br></br>
        <p>Un guide pour vous aider à vous épanouir linguistiquement!..</p>
      </div>
      
      <div className="st__footer-links_div">
        <h4>Liens</h4>
        <p>Accueil</p>
        <p>Réseaux sociaux</p>
        <p>Contact</p>
      </div>
      <div className="st__footer-links_div">
        <h4>SignTalk</h4>
        <p>Crédits </p>
        <p>Code source</p>
        <p>A propos de nous</p>
      </div>
    </div>

    <div className="st__footer-copyright">
      <p>@{(new Date().getFullYear())} SignTalk. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
