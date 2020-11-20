import Api from './Api'
import sessionStorage from '../store/sessionStorage'
import axios from 'axios'

export default {
  getUsers(search) {
    return Api().get(`/browse`, {
      params: {
        category: search.category,
        job: search.job,
        location: search.location,
      },
    })
  },
  getUserData(userId) {
    const jwt = sessionStorage.get('jwt')
    axios.defaults.headers.common['Authorization'] = jwt
    return Api().get(`/yourprofile/${userId}`)
  },
  updateUserData(userData) {
    const jwt = sessionStorage.get('jwt')
    axios.defaults.headers.common['Authorization'] = jwt
    return Api().put(`/yourprofile/${userData.id}`, userData)
  },
  deleteUser(id) {
    const jwt = sessionStorage.get('jwt')
    axios.defaults.headers.common['Authorization'] = jwt
    return Api().delete(`/yourprofile/${id}`)
  },
}
