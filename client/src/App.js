import React, { Component } from 'react';
import {connect} from 'react-redux';

import {fetchMovieTitles} from './actions';

import Header from './components/header';
import Search from './components/search';

export class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchMovieTitles());
  }

  render() {
    return (
      <div className='container'>
        <Header />
        <Search />
        {/*console.log(this.props.titles)*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  titles: state.titles
});

export default connect(mapStateToProps)(App);