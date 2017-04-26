import {SIGNUP_REQUEST, SIGNUP_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, SIGN_OUT} from '../actions/register';
import {ADD_FAVORITE_REQUEST, ADD_FAVORITE_SUCCESS, REMOVE_FAVORITE_REQUEST, REMOVE_FAVORITE_SUCCESS} from '../actions/favorites'

const initialState = {
    data: {},
    loading: false
};

const userReducer = (state=initialState, action) => {
  if (action.type === SIGNUP_REQUEST 
    || action.type === LOGIN_REQUEST 
    || action.type === ADD_FAVORITE_REQUEST
    || action.type === REMOVE_FAVORITE_REQUEST) {
    return Object.assign({}, state, {
      loading: action.loading,
    });
  }
  else if (action.type === SIGNUP_SUCCESS 
        || action.type === LOGIN_SUCCESS
        || action.type === ADD_FAVORITE_SUCCESS
        || action.type === REMOVE_FAVORITE_SUCCESS) {
    return Object.assign({}, state, {
      loading: action.loading,
      data: action.user
    });
  }
  else if (action.type === SIGN_OUT) {
    return Object.assign({}, state, initialState);
  }
  return state;
}

export default userReducer;

