import React from 'react'
import Message from '../Message/Message'

const HistoryCount = ({ quizzCount }) => {
  return (
    <Message>
      <h4>{quizzCount.name}</h4>
      <div>correct: {quizzCount.correct}</div>
      <div>incorrect: {quizzCount.incorrect}</div>
    </Message>
  )
}

export default HistoryCount
