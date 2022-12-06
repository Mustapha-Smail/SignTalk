import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

import { Message, Loader, Navbar } from '../../components'

import './auth.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        setLoading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json' 
                }
            }
    
            const { data } = await axios.post(
                '/api/users/login',
                { email, password }, 
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

    return (
        <>
            <Navbar/>
            <Container >
                <Row className="justify-content-md-center w-100">
                    <Col xs={12} md={6} className="auth-container p-5">
                        <h1 className="my-3">Mon compte</h1>
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading 
                            ? <Loader /> 
                            :<Form onSubmit={submitHandler}>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Entrez email'
                                        value={email}
                                        required={true}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Entrez mot de passe'
                                        value={password}
                                        required
                                        onChange={(e)=>setPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Button
                                    type='submit'
                                    className='mt-3 btn-more'
                                >
                                    Connexion
                                </Button>
                            </Form>
                        }
                        <Row className='py-3'>
                            <Col>
                            Vous n'avez pas de compte ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-success'>Inscription</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Login
