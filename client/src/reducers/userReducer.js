import {SIGNUP_REQUEST, SIGNUP_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS} from '../actions/register';

const initialState = {
    data: {},
    loading: false
};

const userReducer = (state=initialState, action) => {
  if (action.type === SIGNUP_REQUEST || action.type === LOGIN_REQUEST) {
    return Object.assign({}, state, {
      loading: action.loading,
    });
  }
  else if (action.type === SIGNUP_SUCCESS || action.type === LOGIN_SUCCESS) {
    return Object.assign({}, state, {
      loading: action.loading,
      data: action.user
    });
  }
  return state;
}

export default userReducer;

