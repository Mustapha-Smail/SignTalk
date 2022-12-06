import React from 'react'
import { Button, Form } from 'react-bootstrap'

const FormBoot = ({
    btnValue, 
    submitHandler,
    nom, setNom,
    prenom, setPrenom,
    email, setEmail, 
    password, setPassword, 
    confirmPassword, setConfirmPassword
}) => {
  return (
    <Form onSubmit={submitHandler}>
        <Form.Group controlId='nom'>
            <Form.Label>Nom</Form.Label>
            <Form.Control 
                type='nom'
                placeholder='Entrez nom' 
                value={nom}
                onChange={(e)=>setNom(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='prenom'>
            <Form.Label>Prénom</Form.Label>
            <Form.Control 
                type='prenom'
                placeholder='Enter prénom' 
                value={prenom}
                onChange={(e)=>setPrenom(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type='email'
                placeholder='Entrez email' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control 
                type='password'
                placeholder='Entrez mot de passe' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirmer mot de passe</Form.Label>
            <Form.Control 
                type='password'
                placeholder='Confirmez mot de passe' 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button 
            type='submit'
            className='mt-4 btn-more'
        >
            {btnValue}
        </Button>
    </Form>
  )
}

export default FormBoot