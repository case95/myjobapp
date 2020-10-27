export default {   
  set(key, value) {     
    const stringifiedValue = JSON.stringify(value)     
    window.localStorage.setItem(key, stringifiedValue)   
  },   
  get(key) {     
    const value = window.sessionStorage.getItem(key)     
    return value === 'undefined' ? undefined : JSON.parse(value)   
  },   
  remove(key) {     
    window.sessionStorage.removeItem(key)   
  },   
  clear() {     
    window.sessionStorage.clear()   
  }, }