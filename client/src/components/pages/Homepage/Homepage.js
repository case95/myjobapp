import React from 'react'
import { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Form, InputGroup } from 'react-bootstrap'

import usersServices from '../../../services/UsersServices'

import Container from '../../Container/Container'
import Button from '../../Button/Button'
import Input from '../../Input/Input'

import './Homepage.css'

const Homepage = () => {
  const redirect = useHistory()

  const [browse, setBrowse] = useState({ category: '', job: '', location: '' })

  const [error, setError] = useState('')

  const user = useSelector((state) => state.user)

  const onChange = (e) => {
    setBrowse({
      ...browse,
      job: e.target.value,
    })
    console.log(browse)
  }

  const onSubmit = async () => {
    try {
      const response = await usersServices.getUsers(browse)
      if (!response.data.error) {
        setError()
        redirect.push({
          pathname: '/browse',
          usersList: response.data,
        })
      } else {
        setError(response.data.error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="heroImage d-flex">
      <Container
        styleNumber={0}
        title={
          <p className="m-0">
            Search among 1000+ workers <br />
            and services in your area, <br />
            they’re just one click from you!
          </p>
        }
        divider={true}
        redirect={
          <div>
            <Link to="/login" className="link">
              Login to your profile
            </Link>
            <p className="mb-0">or</p>
            <Link to="/register" className="link">
              Create a new account
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
            <Input
              placeholder="Browse"
              type="string"
              value={browse.job}
              name="Browse"
              idNumber={0}
              required={true}
              spacer={false}
              onChange={(e) => onChange(e)}
              prepend={true}
              child={
                <div>
                  <InputGroup.Append>
                    <Button
                      type={'submit'}
                      append={true}
                      style={{ height: '100%' }}
                      child={
                        <i className="fa fa-search" aria-hidden="true"></i>
                      }
                    ></Button>
                  </InputGroup.Append>
                </div>
              }
            />
            {error && <div className="text-danger mb-3">{error}</div>}
          </Form>
        }
      ></Container>
    </div>
  )
}

export default Homepage
