import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './favorites.css';
import FaHeartO from 'react-icons/lib/fa/heart-o';

import {getMovieData} from '../../actions';
import {fetchMovieAlbumData} from '../../actions';
import {deleteFavorite} from '../../actions/favorites';

export class Favorites extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      favorites: []
    };

    // Should I call this in the constructor or in componentDidMount?
    this.setFavorites(this.props.user);
  }

  setFavorites(user) {
    this.getFavoritesData(user).then(favorites => {
      this.setState({
        favorites
      });
    })
    .catch(err => console.error(err));
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.favorites.length !== this.props.user.favorites.length) {
      // pass down the next props thru the call stack
      this.setFavorites(nextProps.user);
    }
  }

  getFavoritesData(user) {
    const favorites = user.favorites.map((favorite, index) => {
      return getMovieData(favorite.title);
    });
    return Promise.all(favorites);
  }

  handleRemoveFavorite(event, idx) {
    event.preventDefault();
    const movieId = this.props.user.favorites[idx]._id;
    const component = this;
    const ids = {
      userId: component.props.user.id,
      movieId
    };
    this.props.dispatch(deleteFavorite(ids));
  }

  handleListen(event, idx) {
    event.preventDefault();
    const movie = this.props.user.favorites[idx].title;
    this.props.dispatch(fetchMovieAlbumData(movie));
  }

  getFavsList() {
    if (this.state.favorites.length > 0) {
      return this.state.favorites.map((favoriteData, idx) => {
        return ( 
          <li key={idx} className='favorite-item row'>
            <div className='poster-wrapper five columns'>
              <img src={`https://image.tmdb.org/t/p/w500${favoriteData.poster_path}`} alt="Poster"/>
            </div>
            <div className='seven columns'>
              <h4>{favoriteData.title}</h4>
              <p><em>{favoriteData.tagline}</em></p>
              <div className='buttons'>
                <div className='btn-bin' onClick={e => this.handleListen(e, idx)}>
                  <Link to='/'>
                    <button className='btn-listen'>Listen</button>
                  </Link>
                </div>
                <div className='btn-bin'>
                  <button 
                  className='btn-remove' 
                  onClick={e => this.handleRemoveFavorite(e, idx)}>
                  Remove</button>
                </div>
              </div>
            </div>
          </li> 
        );
      });
    }
  }

  getInstructions() {
    if (this.state.favorites.length === 0) {
      return (
        <div className='instructions'>
          <h3>Click on the <FaHeartO /> icon to add a movie here</h3>
          <Link to='/'><button>Start Searching</button></Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='favorites-view'>
        <div className='favs-title row'>
          <h1>{`${this.props.user.firstName}'s`} Favorites</h1>  
        </div>
        {this.getInstructions()} 
        <ul className='favs-bin'>
          {this.getFavsList()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data
});

export default connect(mapStateToProps)(Favorites);