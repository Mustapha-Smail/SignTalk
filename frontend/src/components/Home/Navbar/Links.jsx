import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavDropdown } from 'react-bootstrap'

const Links = ({ className }) => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    localStorage.getItem('userInfo') &&
      setUserInfo(localStorage.getItem('userInfo'))
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    //reload
    navigate(0)
  }

  const accountIcon = <i className='fas fa-user-circle'></i>

  return (
    <div className={className}>
      <p>
        <Link to='/'>Accueil</Link>
      </p>
      <NavDropdown title='Apprentissage'>
        <LinkContainer to='/alphabet'>
          <NavDropdown.Item>Alphabet</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/search'>
          <NavDropdown.Item>Rechercher</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/decomposition'>
          <NavDropdown.Item>Décomposer</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>

      <NavDropdown title='Jeux'>
        <LinkContainer to='/quizz'>
          <NavDropdown.Item>Quizz</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/memory'>
          <NavDropdown.Item>Memory</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/hanged'>
          <NavDropdown.Item>Pendu</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
      <p>
        <Link to='/calls'>Chat Vidéo</Link>
      </p>
      {userInfo ? (
        <NavDropdown title={accountIcon}>
          <LinkContainer to='/profile'>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/history'>
            <NavDropdown.Item>Historique</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/badges'>
            <NavDropdown.Item>Badges</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/classement'>
            <NavDropdown.Item>Classement</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>
            Déconnexion
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav className='auth-btns'>
          <p>
            <Link to='/login'>
              <i
                className='fas fa-sign-in'
                aria-hidden='true'
              ></i>
            </Link>
          </p>
          <p>
            <Link to='/register'>
              <i
                className='fas fa-user-plus'
                aria-hidden='true'
              ></i>
            </Link>
          </p>
        </Nav>
      )}
    </div>
  )
}

export default Links
