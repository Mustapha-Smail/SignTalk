import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Navbar } from '../../components'
import "./Calls.css"

const Calls = () => {
    const navigate = useNavigate()
    const domain = process.env.REACT_APP_DAILY_DOMAIN
    const id = process.env.REACT_APP_DAILY_ROOM_ID

    const getData = useCallback(async () => {
        try {
            const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))
            if (!userInfoFromStorage) {
                navigate('/login')
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfoFromStorage.token}`
                }
            }

            const response = await axios.get('/api/calls', config)

            if (response.status === 200) {
                const DAILY_ROOM_URL = `${domain}${id}`;
                const script = document.createElement("script");
                script.innerHTML = window.DailyIframe.createFrame(
                    {
                        iframeStyle: {
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            border: "0",
                            zIndex: 9999
                        },
                        showLeaveButton: true,
                        showFullscreenButton: true,
                        userName: userInfoFromStorage.prenom

                    }
                ).join({ url: DAILY_ROOM_URL });

                let iframes = document.getElementsByTagName('iframe');

                for (let index = 1; index < iframes.length; index++) {
                    iframes[index].remove()
                }

                document.getElementById('call').append(iframes[0])
            }
        } catch (err) {
            console.error(err);
        }
    }
        ,
        [domain, id, navigate],
    )




    useEffect(() => {
        getData()
    }, [domain, getData, id])

    return (
        <>
            <div className='gradient__bg'>
                <Navbar />
                <div id="call"> </div>
            </div>
        </>
    )
}

export default Calls