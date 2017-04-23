import {combineReducers} from 'redux';

import autoCompleteReducer from './autoReducer';
import movieReducer from './movieReducer';

const rootReducer = combineReducers({
  autoComplete: autoCompleteReducer,
  movie: movieReducer
});

export default rootReducer;
