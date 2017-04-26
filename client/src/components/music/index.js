import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import './music.css';

import {playSong, stopSong} from '../../actions';

export class Music extends React.Component{

  constructor(props) {
    super(props);
    this.audio = new Audio();
  }

  componentDidUpdate() {
    if (this.props.audio.isPlaying) {
      this.playSong().then(isOver => {
        return this.props.dispatch(stopSong());
      })
      .catch(err => console.error(err));
    }
    else {
      this.audio.pause();
    }
  }

  playSong() {
    return new Promise((resolve, reject) => { 
      this.audio.preload = 'auto';
      this.audio.autoplay = true;
      this.audio.onerror = reject;
      this.audio.onended = resolve;
      this.audio.src = this.props.audio.song.audioUrl;
    });
  }

  handlePlaySong(e) {
    const song = e.target.dataset
    if (this.props.audio.isPlaying && song.track_num === this.props.audio.song.track_num) {
      console.log('stop');
      return this.props.dispatch(stopSong());
    }
    else if (!this.props.audio.isPlaying) {
      console.log('play');
      const newSong = {
        track_num: song.track_num, 
        audioUrl: song.audio
      };
      //console.log(newSong);
      return this.props.dispatch(playSong(newSong));
    }
  }

  getClass(audio, track_number) {
    if (audio.isPlaying && audio.song.track_num === track_number.toString()) {
      return {className: 'song-on'};
    }
    else {
      return {className: 'song'};
    }
  }

  render() {
    if (this.props.movie.loading) {
      return (
        <div>
          <MuiThemeProvider>
            <CircularProgress />
          </MuiThemeProvider>
        </div>
      );
    } 
    else if (Object.keys(this.props.movie.albumData).length > 0) {
      const album = this.props.movie.albumData;
      const trackList = album.tracks.map((track, idx) => {
        const classAttr = this.getClass(this.props.audio, track.track_number);
        return <li key={idx}
                  {...classAttr} 
                  data-track_num={track.track_number}
                  data-audio={track.preview_url} 
                  onClick={e => this.handlePlaySong(e)}>
                  {track.name}
                </li>;
      });
      return (
        <div className='album'>
          <div className='row'>
            <h3 className="album-title">{album.albumTitle}</h3>
          </div>
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
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  audio: state.audio
});

export default connect(mapStateToProps)(Music);