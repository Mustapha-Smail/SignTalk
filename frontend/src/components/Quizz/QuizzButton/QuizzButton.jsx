import React from 'react';
import { useNavigate } from 'react-router-dom';
import './quizzButton.css';

const QuizzButton = ({ text , page }) => {

    const navigate = useNavigate()

    const getPage = () => {
        navigate(`${page}`)
    }

    return (
        <div className="divQuizzButton">
            <button className="QuizzButton" onClick={getPage}>
                {text}
            </button>
        </div>
    )
}

export default QuizzButton;