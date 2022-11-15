import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

import { Message, Loader, Navbar } from '../../components'

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
                            :<Form onSubmit={submitHandler}>
                                <Form.Group controlId='nom'>
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control 
                                        type='name'
                                        placeholder='Entrez Nom' 
                                        value={nom}
                                        required={true}
                                        onChange={(e)=>setNom(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='prenom'>
                                    <Form.Label>Prenom</Form.Label>
                                    <Form.Control 
                                        type='name'
                                        placeholder='Entrez Prenom' 
                                        value={prenom}
                                        required={true}
                                        onChange={(e)=>setPrenom(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
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
                                        required={true}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='confirmPassword'>
                                    <Form.Label>Confirmez mot de passe</Form.Label>
                                    <Form.Control 
                                        type='password'
                                        placeholder='Confirmez mot de passe' 
                                        value={confirmPassword}
                                        required={true}
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Button
                                    type='submit'
                                    className='mt-3 btn-more'
                                >
                                    Inscription
                                </Button>
                            </Form>
                        }
                        <Row className='py-3'>
                        <Col>
                            Vous avez un compte ? 
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >
                                Connectez-vous
                            </Link>
                        </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Register
