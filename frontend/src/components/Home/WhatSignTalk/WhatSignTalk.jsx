import React from 'react';
import Feature from '../Feature/Feature';
import './WhatSignTalk.css';

const WhatSignTalk = () => (
  <div className="st__whatSignTalk section__margin" id="fonctionnalites">
    <div className="st__whatSignTalk-feature">
      <Feature title="C'est quoi SignTalk?" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas ligula eget feugiat. Pellentesque id finibus odio, a vehicula nulla. Morbi id ex at nulla scelerisque consectetur eu at ante. Vestibulum vitae lorem justo. Nulla enim eros, ultrices nec elementum sed, ultricies id orci." />
    </div>
    <div className="st__whatSignTalk-heading">
      <h1 className="gradient__text">Plus qu’une application, Une nouvelle communication</h1>
      <p>En savoir plus</p>
    </div>
    <div className="st__whatSignTalk-container">
      <Feature title="Apprentissage" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas ligula eget feugiat." />
      <Feature title="Gamification" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas ligula eget feugiat." />
      <Feature title="Communication" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas ligula eget feugiat." />
    </div>
  </div>
);

export default WhatSignTalk;
