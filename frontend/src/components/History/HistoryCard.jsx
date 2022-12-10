import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HistoryCard = ({ game }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Header>
        <Card.Img src='/images/header-img.png' />
      </Card.Header>
      <Card.Body>
        <Link to={`/quizz/${game.game.type.toLowerCase()}/${game._id}`}>
          <Card.Title as='div'>
            <strong>
              {game.game.type === 'quizzLSF'
                ? '4 mots 1 image'
                : '4 images 1 mot'}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          {game.game.isCorrect ? 'Correct' : 'Incorrect'}
        </Card.Text>
        <Card.Text as='div'>
          {new Date(Date.parse(game.createdAt)).toLocaleDateString() +
            ' ' +
            new Date(Date.parse(game.createdAt)).toLocaleTimeString()}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default HistoryCard
