import {combineReducers} from 'redux';

import autoCompleteReducer from './autoReducer';
import movieReducer from './movieReducer';
import audioReducer from './audioReducer';

const rootReducer = combineReducers({
  autoComplete: autoCompleteReducer,
  movie: movieReducer,
  audio: audioReducer
});

export default rootReducer;
