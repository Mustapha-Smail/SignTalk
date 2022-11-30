import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { Navbar, Message, FormBoot } from '../../components'

import './profile.css'

const Profile = () => {
    const navigate = useNavigate()

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))
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
    
                const { data } = await axios.get('/api/users/profile', config)
    
                setNom(data.nom)
                setPrenom(data.prenom)
                setEmail(data.email)
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
    
    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else {
            const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${userInfoFromStorage.token}`
                    }
                }

                const user = {
                    nom, 
                    prenom, 
                    email, 
                    password
                }
    
                const response = await axios.put('/api/users/profile', user, config)

                setSuccess(true)
            } catch (err) {
                setError(
                    err.response && err.response.data.message 
                    ? err.response.data.message 
                    : err.message
                )
            } 
        }

    }
    
    return (
        <>
        <Navbar/> 
        <main className='section__padding py-3'>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            <Row className='justify-content-center align-items-center'>
                <Col md={6} className='profile-container p-5'>
                    <center> 
                        <h1 className='pb-4'>Profile</h1>
                    </center>
                    <FormBoot
                        btnValue="Mettre à jour"
                        submitHandler={submitHandler}
                        nom={nom} setNom={setNom}
                        prenom={prenom} setPrenom={setPrenom}
                        email={email} setEmail={setEmail} 
                        password={password} setPassword={setPassword} 
                        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                    />
                </Col>
            </Row>
        </main>
        </>
    )
};

export default Profile;
