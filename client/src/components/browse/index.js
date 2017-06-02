import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovieAlbumData } from '../../actions';
import { stopSong } from '../../actions';
import './browse.css';

export class Browse extends React.Component {

  componentDidMount() {
    if (this.props.audio.isPlaying) {
      this.props.dispatch(stopSong());
    }
  }

  handleClick(event, idx) {
    event.preventDefault();
    const movie = this.props.titles[idx];
    this.props.dispatch(fetchMovieAlbumData(movie, this.props.accessToken));
  }

doTitles() {
    return this.props.titles.map((title, idx) => {
      return (
        <li key={idx} onClick={e => this.handleClick(e, idx)}>
          <Link to='/'>{title}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='browse-list'>
        <div className='browse-title'>
          <h2>Available Movies</h2>
        </div>
        <ul>
          {this.doTitles()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  titles: state.autoComplete.titles,
  accessToken: state.movie.accessToken,
  audio: state.audio
});

export default connect(mapStateToProps)(Browse);