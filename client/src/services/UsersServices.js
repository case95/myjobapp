import Api from './Api'

export default {
  getUserData(userId) {
    return Api().get(`/yourprofile/${userId}`)
  },
  getUsers(search) {
    return Api().get(`/browse`, {
      params: {
        category: search.category,
        location: search.location,
        position: search.position,
      },
    })
  },
  updateUserData(userData) {
    return Api().put(`/yourprofile/${userData.id}`, userData)
  },
}
