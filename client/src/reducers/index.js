import {combineReducers} from 'redux';

import autoCompleteReducer from './autoReducer';
import movieReducer from './movieReducer';
import audioReducer from './audioReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  autoComplete: autoCompleteReducer,
  movie: movieReducer,
  audio: audioReducer,
  user: userReducer
});

export default rootReducer;
