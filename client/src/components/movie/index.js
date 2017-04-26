import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import FaStarO from 'react-icons/lib/fa/star-o';
import FaStar from 'react-icons/lib/fa/star';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import './movie.css';

import {deleteFavorite} from '../../actions/favorites';
import {addNewFavorite} from '../../actions/favorites';

export class Movie extends React.Component {

  constructor(props) {
    super(props);

    this.isFavorite = false;
    this.isUser = false;
  }

  getHeart() {
    const user = this.props.user;
    const isUser = Object.keys(user).length > 0;
    if (isUser) {
      this.isUser = true;
      for (let i=0; i<user.favorites.length; i++) {
        if (user.favorites[i].title === this.props.title) {
          console.log('hello');
          this.isFavorite = true;
          this.movieId = user.favorites[i]._id;
          return <FaHeart onClick={e => this.handleRemoveFavorite(e)} />;
        }
      }
      return <FaHeartO onClick={e => this.handleAddFavorite(e)} />;
    }
    else {
      return <FaHeartO onClick={e => console.log('Not logged in')} />;
    }
  }

  handleAddFavorite(event) {
    event.preventDefault();
    const id = this.props.user.id;
    const title = this.props.title;
    const newFavorite = {id, title};
    this.props.dispatch(addNewFavorite(newFavorite));
  }

  handleRemoveFavorite(event) {
    event.preventDefault();
    const component = this;
    const ids = {
      userId: component.props.user.id,
      movieId: component.movieId
    };
    this.props.dispatch(deleteFavorite(ids));
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
    else if (Object.keys(this.props.movie.movieData).length > 0) {
      const movie = this.props.movie.movieData;
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
                <p>{this.getHeart()} Add to favorites</p>
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
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  user: state.user.data,
  title: state.movie.movieData.title
});

export default connect(mapStateToProps)(Movie);