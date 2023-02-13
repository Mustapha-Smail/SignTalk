import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Navbar, Ranking } from '../../components'
import axios from 'axios'


const Classement = () => {

    const [players, setPlayers] = useState([])
    const [gameType, setGameType] = useState("quizzLSF")
    const [active, setActive] = useState(true)

    const getData = async (gameType) => {
        try {
            const { data } = await axios.post('/api/history/all', { gameType })
            setPlayers(data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData(gameType)
    }, [gameType])

    const changeGame = (game) => {
        getData(game)
        setActive(!active)
    }

    return (
        <>
            <div className='gradient__bg'>
                <Navbar />
                <div className="section__padding">

                    <div className="section__padding">

                        <ButtonGroup>
                            <Button variant={active ? 'primary' : 'secondary'} onClick={() => changeGame("quizzLSF")}>QuizzLSF</Button>
                            <Button variant={!active ? 'primary' : 'secondary'} onClick={() => changeGame("quizzFR")}>QuizzFR</Button>
                        </ButtonGroup>

                    </div>

                    <Ranking players={players} />

                </div>
            </div>
        </>
    )
}

export default Classement