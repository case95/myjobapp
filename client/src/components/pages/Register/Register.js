import React from 'react'
import { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

import { useHistory, Link } from 'react-router-dom'

import Input from '../../Input/Input'
import Button from '../../Button/Button'
import Container from '../../Container/Container'

import AuthenticationServices from '../../../services/AuthenticationServices'

import { useDispatch } from 'react-redux'
//Importing our actions.
//This helps us organizing our redux store and avoids making typos.
import { SET_TOKEN, SET_USER } from '../../../store/actions'

//Util to save on session storage
import sessionStorage from '../../../store/sessionStorage'

import './Register.css'

const Register = () => {
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    error: '',
  })

  const {
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
    error,
  } = userData

  const history = useHistory()

  const redirect = () => {
    history.push('/')
  }

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async () => {
    try {
      if (password === repeatPassword) {
        const response = await AuthenticationServices.register({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })

        const { id, token } = response.data

        sessionStorage.set('jwt', token)

        dispatch({ type: SET_USER, payload: id })
        dispatch({ type: SET_TOKEN, payload: token })

        redirect()
      } else {
        setUserData({
          ...userData,
          error: "Passwords don't match",
        })
      }
    } catch (err) {
      console.log(err)
      setUserData({
        ...userData,
        error: err.response.data.error,
      })
    }
  }

  return (
    <div className="signInContainer d-flex">
      <Container
        styleNumber={0}
        title={`Don't miss it, be part of our community!`}
        divider={true}
        redirect={
          <Col className="">
            <p className="mb-0">Do you already have an account?</p>
            <Link to="/login" className="link">
              Login to your profile
            </Link>
          </Col>
        }
        child={
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(e)
            }}
          >
            <Row className="m-0">
              <Col className="col-12 col-md-6 p-0 pr-md-1">
                <Input
                  placeholder="Insert your name"
                  type="string"
                  value={firstName}
                  name="firstName"
                  idNumber={0}
                  onChange={(e) => onChange(e)}
                  required={true}
                  maxLength={15}
                ></Input>
              </Col>
              <Col className="col-12 col-md-6 p-0 pl-md-1">
                <Input
                  placeholder="Insert your last name"
                  type="string"
                  value={lastName}
                  name="lastName"
                  idNumber={1}
                  onChange={(e) => onChange(e)}
                  required={true}
                  maxLength={20}
                ></Input>
              </Col>
            </Row>

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

            <Row className="m-0">
              <Col className="col-12 col-md-6 p-0 pr-md-1">
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
              <Col className="col-12 col-md-6 p-0 pl-md-1">
                <Input
                  className="mb-0 mb-3"
                  placeholder="Repeat the password"
                  type="password"
                  name="repeatPassword"
                  idNumber={4}
                  onChange={(e) => onChange(e)}
                  required={true}
                  maxLength={25}
                ></Input>
              </Col>
            </Row>

            {error && <div className="text-danger mb-3">{error}</div>}

            <div>
              <p className="disclaimer">
                By clicking Join, you agree to the website{' '}
                <Link to="/notfound" className="link disclaimerLink">
                  Privacy Policy
                </Link>
                , and{' '}
                <Link to="/notfound" className=" link disclaimerLink">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            <Button type={'submit'}>Join</Button>
          </Form>
        }
      ></Container>
    </div>
  )
}

export default Register
