import {PLAY_SONG, STOP_SONG} from '../actions';

const initialState = {
    isPlaying: false,
    song: {}
};

const audioReducer = (state=initialState, action) => {
  if (action.type === PLAY_SONG) {
    return Object.assign({}, state, {
      isPlaying: true,
      song: action.song
    });
  }
  else if (action.type === STOP_SONG) {
    return Object.assign({}, state, {
      isPlaying: false,
      song: {}
    });
  }
  return state;
}

export default audioReducer;