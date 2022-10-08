import React from 'react';
import './quizzButton.css';

const QuizzButton = ({text}) => (
    
        <div className="divQuizzButton">
            <button className="QuizzButton">
                {text}
            </button>
        </div>
  );

export default QuizzButton;