import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovieAlbumData } from '../../actions';
import './browse.css';

export function Browse(props) {

  function handleClick(event, idx) {
    event.preventDefault();
    const movie = props.titles[idx];
    props.dispatch(fetchMovieAlbumData(movie, props.accessToken));
  }

  function doTitles() {
    return props.titles.map((title, idx) => {
      return (
        <li key={idx} onClick={e => handleClick(e, idx)}>
          <Link to='/'>{title}</Link>
        </li>
      );
    });
  }

  return (
    <div className='browse-list'>
      <div className='browse-title'>
        <h2>Available Movies</h2>
      </div>
      <ul>
        {doTitles()}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  titles: state.autoComplete.titles,
  accessToken: state.movie.accessToken
});

export default connect(mapStateToProps)(Browse);