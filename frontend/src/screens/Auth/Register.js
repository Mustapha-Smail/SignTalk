import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

import { Message, Loader, Navbar, FormBoot } from '../../components'

import './auth.css'

const Register = () => {
    const [nom, setNom] = useState('')   
    const [prenom, setPrenom] = useState('')   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect])
    
    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match') 
        }else {
            setLoading(true)
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                }
        
                const { data } = await axios.post(
                    '/api/users/',
                    { nom, prenom, email, password }, 
                    config
                )
    
                setLoading(false)
                setError(null)
                localStorage.setItem('userInfo', JSON.stringify(data))
                navigate(redirect)
            } catch (err) {
                console.error(err)
                setLoading(false)
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
            <Container>
                <Row className="justify-content-md-center w-100">
                    <Col xs={12} md={6} className="auth-container p-5">
                        <h1 className="my-3">Inscription</h1>
                        {error && <Message variant='danger'>{error}</Message>}
                        {message && <Message variant='danger'>{message}</Message>}
                        {loading 
                            ? <Loader /> 
                            :<FormBoot
                                btnValue="Inscription"
                                submitHandler={submitHandler}
                                nom={nom} setNom={setNom}
                                prenom={prenom} setPrenom={setPrenom}
                                email={email} setEmail={setEmail} 
                                password={password} setPassword={setPassword} 
                                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                            />
                        }
                        <Row className='py-3'>
                        <Col>
                            Vous avez un compte ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-success' >Connectez-vous</Link>
                        </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Register
