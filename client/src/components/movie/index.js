import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import FaStarO from 'react-icons/lib/fa/star-o';
import FaStar from 'react-icons/lib/fa/star';
import FaHeartO from 'react-icons/lib/fa/heart-o';
//import FaHeart from 'react-icons/lib/fa/heart';
import './movie.css';

export function Movie(props) {
  if (props.movie.loading) {
    return (
      <div>
        <MuiThemeProvider>
          <CircularProgress />
        </MuiThemeProvider>
      </div>
    );
  }
  else if (Object.keys(props.movie.movieData).length > 0) {
    const movie = props.movie.movieData;
    return (
      <div className='movie row'> 

        <div className='left-well three columns'>
          <img src={movie.poster} className='movie-poster' alt='Poster' />
        </div>

        <div className='right-well nine columns'>

          <div className='row'>

            <div className='ten columns'>
              <h4>{movie.title}</h4>
              <div className='stars-container'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarO />
              </div>
              <p><FaHeartO /> Add to favorites</p>
            </div>
            
            <div className='two columns' id='year-wrapper'>
              <h4 className='year'>{`(${movie.year})`}</h4>
            </div>

          </div>

          <div className='second row'>
            <p><em>{movie.tagline}</em></p>
          </div>
          <div className='final row'>
            <p className='description'>{movie.description}</p>
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

export default connect(mapStateToProps)(Movie);