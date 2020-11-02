import Api from './Api'

import axios from 'axios'

import sessionStorage from '../store/sessionStorage'

export default {
  register(credentials) {
    return Api().post('register', credentials)
  },
  login(credentials) {
    return Api().post('login', credentials)
  },
  async getAuth({ onError }) {
    try {
      const jwt = sessionStorage.get('jwt')
      console.log('jwt', jwt)
      axios.defaults.headers.common['Authorization'] = jwt
      const authResponse = await Api().get('auth')
      console.log('authResponse', authResponse)
      const { user } = authResponse.data
      return user
    } catch (err) {
      onError()
    }
  },
}
