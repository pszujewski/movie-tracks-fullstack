import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import './music.css';

export function Music(props) {
  if (props.movie.loading) {
    return (
      <div>
        <MuiThemeProvider>
          <CircularProgress />
        </MuiThemeProvider>
      </div>
    );
  } 
  else if (Object.keys(props.movie.albumData).length > 0) {
    function handlePlaySong(e) {
      console.log('click');
    }
    const album = props.movie.albumData;
    const trackList = album.tracks.map((track, idx) => {
      return <li key={idx}
                className='song' 
                data-trackNum={idx} 
                onClick={e => handlePlaySong(e)}>
                {track.name}
              </li>;
    });
    return (
      <div className='album'>
        <h3 className="album-title">{album.albumTitle}</h3>
        <div className='row'>
          <div className='four columns'>
            <img className="album-art" src={album.albumArtUrl} 
              alt={`Album Art for ${album.albumTitle}`} />
          </div>
          <div className="eight columns track-list">
            <ol>
              {trackList}
            </ol>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie
});

export default connect(mapStateToProps)(Music);