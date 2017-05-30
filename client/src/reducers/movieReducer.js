import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, 
        FETCH_DATA_ERROR, ACCESS_TOKEN_REQ, ACCESS_TOKEN_SUCCESS } from '../actions';

const initialState = {
    movieData: {},
    albumData: {},
    accessToken: null,
    loading: false,
    error: false
};

const movieReducer = (state=initialState, action) => {
  if (action.type === FETCH_DATA_REQUEST || action.type === ACCESS_TOKEN_REQ) {
    return Object.assign({}, state, {
      loading: action.loading,
      error: action.error
    });
  }
  else if (action.type === ACCESS_TOKEN_SUCCESS) {
    return Object.assign({}, state, {
      loading: action.loading,
      error: action.error,
      accessToken: action.accessToken
    });
  }
  else if (action.type === FETCH_DATA_SUCCESS) {
    return Object.assign({}, state, {
      loading: action.loading,
      error: action.error,
      movieData: action.movie,
      albumData: action.album
    });
  }
  else if (action.type === FETCH_DATA_ERROR) {
    return Object.assign({}, state, {
      movieData: {},
      albumData: {},
      loading: action.loading,
      error: action.error
    });
  }
  return state;
}

export default movieReducer;