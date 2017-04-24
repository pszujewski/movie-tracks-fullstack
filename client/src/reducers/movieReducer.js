import {FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS} from '../actions';

const initialState = {
    movieData: {},
    albumData: {},
    loading: false
};

const movieReducer = (state=initialState, action) => {
  if (action.type === FETCH_DATA_REQUEST) {
    return Object.assign({}, state, {
      loading: action.loading
    });
  }
  else if (action.type === FETCH_DATA_SUCCESS) {
    return Object.assign({}, state, {
      loading: action.loading,
      movieData: action.movie,
      albumData: action.album
    });
  }
  return state;
}

export default movieReducer;