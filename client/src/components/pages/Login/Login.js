import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { Row, Col, Form } from 'react-bootstrap'

import { useHistory, Link } from 'react-router-dom'

//Redux hook
import { useDispatch } from 'react-redux'

//Importing our actions.
//This helps us organizing our redux store and avoids making typos.
import { SET_TOKEN, SET_USER } from '../../../store/actions'

import Input from '../../Input/Input'
import Button from '../../Button/Button'
import Container from '../../Container/Container'

import AuthenticationServices from '../../../services/AuthenticationServices'

//Util to save on session storage
import sessionStorage from '../../../store/sessionStorage'

import './Login.css'

const LogIn = () => {
  //const token = useSelector((state) => state.token);
  //const user = useSelector((state) => state.user);

  const dispatch = useDispatch()

  const [loginData, setLoginData] = useState({ email: '', password: '' })

  const { email, password, error } = loginData

  const history = useHistory()

  const redirect = () => {
    history.push('/')
  }

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async () => {
    try {
      const response = await AuthenticationServices.login({
        email: email,
        password: password,
      })
      const { user, token } = response.data

      sessionStorage.set('jwt', token)

      dispatch({ type: SET_USER, payload: user.id })
      dispatch({ type: SET_TOKEN, payload: token })

      redirect()
    } catch (err) {
      console.log(err)
      setLoginData({
        ...loginData,
        error: err.response.data.error,
      })
    }
  }
  return (
    <div className="logInContainer d-flex">
      <Container
        /*className="noPositionAbsolute"*/
        styleNumber={0}
        title={`Login to manage your profile.`}
        divider={true}
        redirect={
          <div>
            <p className="mb-0">You don't have an account yet?</p>
            <Link to="/register" className="link">
              Create one!
            </Link>
          </div>
        }
        child={
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(e)
            }}
          >
            <Row className="m-0">
              <Col className="p-0 ">
                <Input
                  placeholder="Insert your email"
                  type="email"
                  value={email}
                  name="email"
                  idNumber={2}
                  onChange={(e) => onChange(e)}
                  required={true}
                  maxLength={25}
                ></Input>
              </Col>
            </Row>

            <Row className="m-0">
              <Col className="p-0">
                <Input
                  placeholder="Insert a password"
                  type="password"
                  value={password}
                  name="password"
                  idNumber={3}
                  onChange={(e) => onChange(e)}
                  required={true}
                  maxLength={25}
                ></Input>
              </Col>
            </Row>

            {error && <div className="text-danger mb-3">{error}</div>}

            <Form.Group controlId="formBasicCheckbox ">
              <Form.Check
                type="checkbox"
                label="Remember me."
                className="checkbox"
              />
            </Form.Group>
            <Button type={'submit'}>Join</Button>
          </Form>
        }
      ></Container>
    </div>
  )
}

export default LogIn
