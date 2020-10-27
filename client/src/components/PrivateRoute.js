import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import {useSelector} from 'react-redux'

import AuthenticationServices from '../services/AuthenticationServices'

import PropTypes from 'prop-types'

const PrivateRoute = ({ component, ...options }) => {
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const validateJWT = async () => {
      if (!authData.user) {
        await AuthenticationServices.getAuth({ onError: routes.pushToLoginUrl })
      }
    }
    validateJWT()
  }, [authData, routes, fetchAuthData])

  return authData.user && <Route {...options} component={component} />
}

PrivateRoute.propTypes = {
  component: PropTypes.node,
}

PrivateRoute.defaultProps = {
  component: null,
}

export default PrivateRoute