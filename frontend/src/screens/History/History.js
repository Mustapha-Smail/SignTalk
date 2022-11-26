import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { Navbar, HistoryCard, Message, HistoryCount } from '../../components'
import './History.css'
import { Link } from 'react-router-dom'

const History = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [history, setHistory] = useState(null)
    const [historyCount, setHistoryCount] = useState(null)

    const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        if (!userInfoFromStorage) {
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

                setHistory(data.historyGame)
                setHistoryCount(data.count)

            } catch (err) {
                setError(
                    err.response && err.response.data.message
                        ? err.response.data.message
                        : err.message
                )
            }
        }
        getUserData()
    }, [navigate, userInfoFromStorage]);

    const deleteHistory = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfoFromStorage.token}`
                }
            }
            const { data } = await axios.delete('/api/history', config)
            setMessage(data.message)
        } catch (err) {
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            )
        }
    }

    return (
        <>
            <Navbar />
            <main className='section__padding history__body'>
                {error && (<Message variant={'danger'}>{error}</Message>)}
                {message && (<Message variant={'success'}>{message}</Message>)}

                {historyCount && (<Row>
                    <Col sm={12} md={6}>
                        <HistoryCount quizzCount={historyCount.quizzLSF} />
                    </Col>
                    <Col sm={12} md={6}>
                        <HistoryCount quizzCount={historyCount.quizzFR} />
                    </Col>
                </Row>)}
                {history && (<>
                    <Row>
                        <Col sm={2} onClick={deleteHistory} className="delete__history">
                            <Message variant={'danger'}>Supprimer mon historique</Message>
                        </Col>
                    </Row>
                    <Row>
                        {history.slice(0).reverse().map(game => (
                            <Col key={game._id} sm={12} md={6} lg={4} xl={3}>
                                <HistoryCard game={game} />
                            </Col>
                        ))}
                    </Row>
                </>)}
            </main>
        </>
    )
}

export default History