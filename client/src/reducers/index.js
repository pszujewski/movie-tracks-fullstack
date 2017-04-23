import {combineReducers} from 'redux';

import autoCompleteReducer from './autoReducer';

const rootReducer = combineReducers({
  autoComplete: autoCompleteReducer
});

export default rootReducer;
