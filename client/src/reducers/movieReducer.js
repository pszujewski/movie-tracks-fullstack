import {FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS} from '../actions';

const initialState = {
    data: {},
    loading: false
};

const movieReducer = (state=initialState, action) => {
  if (action.type === FETCH_MOVIE_REQUEST) {
    return Object.assign({}, state, {
      loading: action.loading
    });
  }
  else if (action.type === FETCH_MOVIE_SUCCESS) {
    return Object.assign({}, state, {
      loading: action.loading,
      data: action.movie
    });
  }
  return state;
}

export default movieReducer;