import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Navbar, Message } from '../../components'

const History = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [history, setHistory] = useState(null)

    useEffect(() => {
        const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))
        console.log(userInfoFromStorage);
        if(!userInfoFromStorage){
            navigate('/login')
        }

        const getUserData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${userInfoFromStorage.token}`
                    }
                }
    
                const { data } = await axios.get('/api/history', config)

                setHistory(data)
    
            } catch (err) {
                setError(
                    err.response && err.response.data.message 
                    ? err.response.data.message 
                    : err.message
                )
            } 
        }
        getUserData()
    }, [navigate]);


    console.log(history);

  return (
    <>
        <Navbar/> 
        <main>
            <table border="1">
                {history && history.map(game => (
                    <tr>
                        <td>{game.game._id}</td>
                        <td>{game.game.type}</td>
                        <td>{game.game.isCorrect ? "Correct" : "Incorrect"}</td>
                        <td>{game.createdAt}</td>
                        <td>{Date(Date.parse(game.createdAt))}</td>
                    </tr>
                ))}
            </table>
        </main>
    </>
  )
}

export default History