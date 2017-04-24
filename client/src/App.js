import React, { Component } from 'react';
import {connect} from 'react-redux';

import {fetchMovieTitles} from './actions';

import Header from './components/header';
import Search from './components/search';
import Movie from './components/movie';
import Music from './components/music';

export class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchMovieTitles());
  }

  render() {
    return (
      <div className='container'>
        <Header />
        <Search />
        <Movie />
        <Music />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  titles: state.titles
});

export default connect(mapStateToProps)(App);