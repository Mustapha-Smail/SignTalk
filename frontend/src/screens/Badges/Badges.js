import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Navbar} from '../../components'
import { CardImgContainer } from '../../components'

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
            } else if (score >= 10) {
                setSilverLSF(true)
            } else if (score >= 30) {
                setGoldLSF(true)
            } else if (score >= 50) {
                setDiamondLSF(true)
            }

            const sc2 = historyCount.quizzFR.correct
            setScore2(sc2)
            if (score2 > 0) {
                setBronzeM(true)
            } else if (score2 >= 10) {
                setSilverM(true)
            } else if (score2 >= 30) {
                setGoldM(true)
            } else if (score2 >= 50) {
                setDiamondM(true)
            }
        }
    }, [historyCount, navigate, score, score2, userInfoFromStorage]);



    return (
        <>
            <div className="gradient__bg">  
                <Navbar />
                <main className='section__padding Badge__body'>

                    <Row>   
                        <CardImgContainer imgSrc='/images/Bronze-signe-badge.png' text='Félicitation vous avez eu au moins 1 bonne réponse au jeu 4 mots 1 image' className={bronzeLSF ? 'unlocked' : 'locked'}/>

                        <CardImgContainer imgSrc='/images/Silver-signe-badge.png' text='Félicitation vous avez eu au moins 10 bonnes réponses au jeu 4 mots 1 image' className={silverLSF ? 'unlocked' : 'locked'}/>

                        <CardImgContainer imgSrc='/images/Gold-signe-badge.png' text='Félicitation vous avez eu au moins 30 bonnes réponses au jeu 4 mots 1 image' className={goldLSF ? 'unlocked' : 'locked'}/>

                        <CardImgContainer imgSrc='/images/Diamond-signe-badge.png' text='Félicitation vous avez eu au moins 50 bonnes réponses au jeu 4 mots 1 image' className={diamondLSF ? 'unlocked' : 'locked'} />
                    </Row>

                    <Row>   
                        <CardImgContainer imgSrc='/images/Bronze-mot-badge.png' text='Félicitation vous avez eu au moins 1 bonnes réponses au jeu 4 images 1 mot' className={bronzeM ? 'unlocked' : 'locked'}/>

                        <CardImgContainer imgSrc='/images/Silver-mot-badge.png' text='Félicitation vous avez eu au moins 10 bonnes réponses au jeu 4 images 1 mot' className={silverM ? 'unlocked' : 'locked'}/>

                        <CardImgContainer imgSrc='/images/Gold-mot-badge.png' text='Félicitation vous avez eu au moins 30 bonnes réponses au jeu 4 images 1 mot' className={goldM ? 'unlocked' : 'locked'}/>   

                        <CardImgContainer imgSrc='/images/Diamond-mot-badge.png' text='Félicitation vous avez eu au moins 50 bonnes réponses au jeu 4 images 1 mot' className={diamondM ? 'unlocked' : 'locked'} />
                    </Row>
                </main>
            </div>  
        </>
    )
}

export default Badges