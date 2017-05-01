import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../actions';

const initialState = {
    movieData: {},
    albumData: {},
    loading: false,
    error: false
};

const movieReducer = (state=initialState, action) => {
  if (action.type === FETCH_DATA_REQUEST) {
    return Object.assign({}, state, {
      loading: action.loading,
      error: action.error
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