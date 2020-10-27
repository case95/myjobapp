import Api from "./Api";

export default {
  getUserData(userId) {
    return Api().get(`/yourprofile/${userId}`)
  },
  getUsers(search) {
    return Api().get(`/browse`, { params: { search: search } })
  },
  updateUserData(userData) {
    return Api.put(``)
  }
};
