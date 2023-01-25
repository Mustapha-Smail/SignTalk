import React from 'react'
import { Table } from 'react-bootstrap'

import './Ranking.css'

const Ranking = ({ players }) => {
  const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))

  return (
    <>
      <Table
        className={'section__padding'}
        responsive
      >
        <thead>
          <tr>
            <th>Place</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr
              key={index}
              className={userInfoFromStorage._id === player.id && 'userPlayer'}
            >
              <td>{index + 1}</td>
              <td>{player.nom}</td>
              <td>{player.prenom}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Ranking
