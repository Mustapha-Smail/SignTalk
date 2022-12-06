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
    const [score2, setScore2] = useState(null)
    const [bronzeLSF, setBronzeLSF] = useState(null)
    const [silverLSF, setSilverLSF] = useState(null)
    const [goldLSF, setGoldLSF] = useState(null)
    const [diamondLSF, setDiamondLSF] = useState(null)

    const [bronzeM, setBronzeM] = useState(null)
    const [silverM, setSilverM] = useState(null)
    const [goldM, setGoldM] = useState(null)
    const [diamondM, setDiamondM] = useState(null)
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
            const sc = historyCount.quizzLSF.correct
            setScore(sc)
            if (score > 0) {
                setBronzeLSF(true)
            } else if (score > 10) {
                setSilverLSF(true)
            } else if (score > 30) {
                setGoldLSF(true)
            } else if (score > 50) {
                setDiamondLSF(true)
            }

            const sc2 = historyCount.quizzFR.correct
            setScore2(sc2)
            if (score2 > 0) {
                setBronzeM(true)
            } else if (score > 10) {
                setSilverM(true)
            } else if (score > 30) {
                setGoldM(true)
            } else if (score > 50) {
                setDiamondM(true)
            }

        }
    }, [historyCount, navigate, score, userInfoFromStorage]);



    return (
        <>
            <div className="gradient__bg">  
                <Navbar />
                <main className='section__padding'>

                    <Row>   
                        {/* <Col> */}
                            {/* <CardGroup> */}
                            <Col sm={12} md={7} lg={4} xl={3} style={{padding: 50}}>
                                <Card>
                                    <CardImg src='/images/Bronze-signe-badge.png' className={bronzeLSF ? 'unlocked' : 'locked'} />
                                </Card>
                            </Col>
                            <Col sm={12} md={7} lg={4} xl={3} style={{padding: 50}}>
                                <Card>
                                    <CardImg src='/images/Silver-signe-badge.png' className={silverLSF ? 'unlocked' : 'locked'} />
                                </Card>
                            </Col>
                            <Col sm={12} md={6} lg={4} xl={3} style={{padding: 50}}>
                                <Card>
                                    <CardImg src='/images/Gold-signe-badge.png' className={goldLSF ? 'unlocked' : 'locked'} />
                                </Card>
                            </Col>
                            <Col sm={12} md={6} lg={4} xl={3} style={{padding: 50}}>
                                <Card>
                                    <CardImg src='/images/Diamond-signe-badge.png' className={diamondLSF ? 'unlocked' : 'locked'} />
                                </Card>
                            </Col>
                            {/* </CardGroup> */}
                        {/* </Col> */}
                    </Row>

                    <Row>   
                        {/* <Col> */}
                            {/* <CardGroup> */}
                            <Col sm={12} md={7} lg={4} xl={3} style={{padding: 50}}>
                                <Card>
                                    <CardImg src='/images/Bronze-signe-badge.png' className={bronzeM ? 'unlocked' : 'locked'} />
                                </Card>
                            </Col>
                            <Col sm={12} md={7} lg={4} xl={3} style={{padding: 50}}>
                                <Card>
                                    <CardImg src='/images/Silver-signe-badge.png' className={silverM ? 'unlocked' : 'locked'} />
                                </Card>
                            </Col>
                            <Col sm={12} md={6} lg={4} xl={3} style={{padding: 50}}>
                                <Card>
                                    <CardImg src='/images/Gold-signe-badge.png' className={goldM ? 'unlocked' : 'locked'} />
                                </Card>
                            </Col>
                            <Col sm={12} md={6} lg={4} xl={3} style={{padding: 50}}>
                                <Card>
                                    <CardImg src='/images/Diamond-signe-badge.png' className={diamondM ? 'unlocked' : 'locked'} />
                                </Card>
                            </Col>
                            {/* </CardGroup> */}
                        {/* </Col> */}
                    </Row>

                </main>
            </div>
        </>
    )
}

export default Badges