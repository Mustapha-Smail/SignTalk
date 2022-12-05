import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardGroup, CardImg, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components'

import './Badges.css'

const Badges = () => {

    const navigate = useNavigate()
    const [historyCount, setHistoryCount] = useState(null)
    const [score, setScore] = useState(null)
    const [bronze, setBronze] = useState(null)
    const [silver, setSilver] = useState(null)
    const [gold, setGold] = useState(null)
    const [error, setError] = useState(null)

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

        if (historyCount) {
            const sc = historyCount.quizzLSF.correct + historyCount.quizzFR.correct
            setScore(sc)
            if (score > 0) {
                setBronze(true)
            } else if (score > 10) {
                setSilver(true)
            } else if (score > 30) {
                setGold(true)
            }
        }
    }, [historyCount, navigate, score, userInfoFromStorage]);



    return (
        <>
            <div className="gradient__bg">
                <Navbar />
                <main className='section__padding'>

                    <Row>
                        <Col>
                            <CardGroup>
                                <Card>
                                    <CardImg src='/images/bronze-badge.png' className={bronze ? 'unlocked' : 'locked'} />
                                </Card>
                                <Card>
                                    <CardImg src='/images/silver-badge.png' className={silver ? 'unlocked' : 'locked'} />
                                </Card>
                                <Card>
                                    <CardImg src='/images/gold-badge.png' className={gold ? 'unlocked' : 'locked'} />
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>

                </main>
            </div>
        </>
    )
}

export default Badges