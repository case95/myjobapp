import Api from './Api'

export default {
  getCategories() {
    return Api().get(`categories`)
  },
}
