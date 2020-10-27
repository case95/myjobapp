//Importing our actions.
//This helps us organizing our redux store and avoids making typos.
import { SET_TOKEN, SET_USER, SIGN_IN_OUT } from "./actions";

const initialState = {
  token: null,
  user: null,
  isSignedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SIGN_IN_OUT:
      if (state.user && state.token) {
        return {
          ...state,
          isSignedIn: !state.isSignedIn,
        };
      } else {
        break;
      }

    default:
      return state;
  }
};

export default reducer;
