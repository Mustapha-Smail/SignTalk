import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { Navbar, HistoryCard, Message, HistoryCount } from '../../components'
import './History.css'

const History = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [history, setHistory] = useState(null)
    const [historyCount, setHistoryCount] = useState(null)

    useEffect(() => {
        const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))
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
    }, [navigate]);

    return (
        <>
            <Navbar />
            <main className='section__padding history__body'>
                {error ?
                    <Message variant={'danger'}>{error}</Message>
                    : (<>
                        {historyCount && (<Row>
                            <Col sm={12} md={6}>
                                <HistoryCount quizzCount={historyCount.quizzLSF} />
                            </Col>
                            <Col sm={12} md={6}>
                                <HistoryCount quizzCount={historyCount.quizzFR} />
                            </Col>
                        </Row>)}
                        <Row>
                            {history && history.slice(0).reverse().map(game => (
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