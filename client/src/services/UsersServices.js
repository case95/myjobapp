import Api from './Api'

export default {
  getUserData(userId) {
    return Api().get(`/yourprofile/${userId}`)
  },
  getUsers(search) {
    return Api().get(`/browse`, {
      params: {
        category: search.category,
        job: search.job,
        location: search.location,
      },
    })
  },
  updateUserData(userData) {
    return Api().put(`/yourprofile/${userData.id}`, userData)
  },
  deleteUser(id) {
    return Api().delete(`/yourprofile/${id}`)
  },
}
