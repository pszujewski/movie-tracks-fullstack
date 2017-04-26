export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signUpRequest = () => ({
    type: SIGNUP_REQUEST,
    loading: true
});

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signUpSuccess = user => ({
    type: SIGNUP_SUCCESS,
    loading: false,
    user
});

export const postSignUp = newUser => dispatch => {
  dispatch(signUpRequest());
  return fetch('../../../api/signup', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(userDoc => {
    console.log(userDoc);
    return dispatch(signUpSuccess(userDoc));
  })
  .catch(err => console.error(err));
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const logInRequest = () => ({
    type: LOGIN_REQUEST,
    loading: true
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const logInSuccess = user => ({
    type: LOGIN_SUCCESS,
    loading: false,
    user
});

export const fetchLogInData = (email, password) => dispatch => {
  dispatch(logInRequest());
  fetch('../../../api/login', {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(email+':'+password),
      'Credentials': 'same-origin'
    }
  })
  .then(response => response.json())
  .then(user => {
    console.log('--- log in success ---');
    console.log(user);
    return dispatch(logInSuccess(user));
  })
  .catch(err => console.error(err));
}

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
    type: SIGN_OUT
});
