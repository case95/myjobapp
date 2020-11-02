//Importing our actions.
//This helps us organizing our redux store and avoids making typos.
import { SET_TOKEN, SET_USER } from './actions'

const initialState = {
  token: null,
  user: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }

    default:
      return state
  }
}

export default reducer
