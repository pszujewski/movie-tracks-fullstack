import {FETCH_TITLES_REQUEST, FETCH_TITLES_SUCCESS} from '../actions';

const initialState = {
    titles: [],
    loading: true
};

const autoCompleteReducer = (state=initialState, action) => {
  if (action.type === FETCH_TITLES_REQUEST) {
    return initialState;
  }
  else if (action.type === FETCH_TITLES_SUCCESS) {
    return Object.assign({}, state, {
      loading: action.loading,
      titles: action.titles
    });
  }
  return state;
}

export default autoCompleteReducer;