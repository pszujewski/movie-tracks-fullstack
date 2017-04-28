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
          this.isFavorite = true;
          this.movieId = user.favorites[i]._id;
          return <FaHeart className='heart' onClick={e => this.handleRemoveFavorite(e)} />;
        }
      }
      return <FaHeartO className='heart' onClick={e => this.handleAddFavorite(e)} />;
    }
    else {
      return <FaHeartO className='heart' onClick={e => alert('Sign up to track your favorites!')} />;
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

  getStars() {
    const movie = this.props.movie.movieData;
    let end;
    let stars = [];
    switch (true) {
      case movie.rating <= 5:
        end = 2; 
        break;
      case movie.rating < 7.5 && movie.rating > 5:
        end = 3; 
        break;
      case movie.rating <= 8 && movie.rating >= 7.5:
        end = 4; 
        break;
      case movie.rating > 8:
        end = 5; 
        break;
      default:
        break;
    }
    for (let i=1; i <= end; i++) {
      stars.push(<FaStar key={`first${i}`} />);
    }
    for (let i=1; i <= (5 - end); i++) {
      stars.push(<FaStarO key={`second${i}`} />);
    }
    return stars;
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
                 {this.getStars()}
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