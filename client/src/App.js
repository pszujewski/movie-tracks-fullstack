import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// Redirect
import {fetchMovieTitles} from './actions';

import Header from './components/header';
import Home from './components/home';
import Form from './components/form';
import Notify from './components/notify';
import Favorites from './components/favorites';
import FavoriteNotify from './components/favoritenotify';

export class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchMovieTitles());
  }

  getForm(type) {
    const isUser = Object.keys(this.props.user.data).length > 0;
    if (isUser) {
      return <Notify />;
    } 
    else  {
      return <Form formType={type} />;
    }
  }

  getFavorites() {
    const isUser = Object.keys(this.props.user.data).length > 0;
    if (isUser) {
      return <Favorites />;
    } 
    else  {
      return <FavoriteNotify />;
    }
  }

  render() {
    return (
      <Router> 
        <div className='container'>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={() => this.getForm('signup')} />
          <Route exact path="/login" component={() => this.getForm('login')} />
          <Route exact path="/favorites" component={() => this.getFavorites()} />
        </div>
      </Router> 
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);