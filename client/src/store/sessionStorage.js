export default {
  set(key, value) {
    const stringifiedValue = JSON.stringify(value)
    window.localStorage.setItem(key, stringifiedValue)
  },
  get(key) {
    const value = window.localStorage.getItem(key)
    return value === 'undefined' ? undefined : JSON.parse(value)
  },
  remove(key) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  },
}
