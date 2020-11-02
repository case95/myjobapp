import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'

import AuthenticationServices from '../services/AuthenticationServices'

import { useDispatch } from 'react-redux'
import { SET_USER } from '../store/actions'

import PropTypes from 'prop-types'

const PrivateRoute = ({ component, ...options }) => {
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const onError = () => {
    history.push('/login')
  }
  console.log('user', user)
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

  return user && <Route {...options} component={component} />
}

PrivateRoute.propTypes = {
  component: PropTypes.node,
}

PrivateRoute.defaultProps = {
  component: null,
}

export default PrivateRoute
