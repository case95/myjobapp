import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Navbar } from 'react-bootstrap'

import sessionStorage from '../../store/sessionStorage'

import { useHistory } from 'react-router-dom'

//Hook to use redux in functional components
import { useSelector, useDispatch } from 'react-redux'
import { SET_USER } from '../../store/actions'

import AuthenticationServices from '../../services/AuthenticationServices'

import './Header.css'

const Header = ({ children, logo }) => {
  const history = useHistory()

  const user = !!useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onError = () => {
    return
  }

  const logout = () => {
    sessionStorage.clear()
    dispatch({ type: SET_USER, payload: null })
    history.push('/')
  }

  useEffect(() => {
    const validateJWT = async () => {
      if (!user) {
        const userResponse = await AuthenticationServices.getAuth({ onError })

        if (userResponse) {
          dispatch({ type: SET_USER, payload: userResponse.id })
        }
      }
    }
    validateJWT()
  }, [user, AuthenticationServices])

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="m-0 py-3">
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        {logo} {children}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Link to="/" className="navbar-brand "></Link>
        <ul className="navbar-nav text-right">
          <li className="nav-item ">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/browse" className="nav-link">
              Browse
            </Link>
          </li>

          {!user && (
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          )}

          {!user && (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Log In
              </Link>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <Link to="/yourprofile" className="nav-link">
                Your Profile
              </Link>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => logout()}>
                Log Out
              </Link>
            </li>
          )}
        </ul>
      </Navbar.Collapse>
    </Navbar>
  )
}

Header.defaultProps = {
  children: 'My App',
}

Header.propTypes = {
  children: PropTypes.string,
}

/*
<Navbar bg="light" expand="lg">
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
*/

export default Header
