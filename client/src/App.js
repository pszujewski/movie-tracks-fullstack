import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Redirect
import { fetchMovieTitles } from './actions';

import Header from './components/header';
import Home from './components/home';
import Form from './components/form';
import Notify from './components/notify';
import Browse from './components/browse';
import Favorites from './components/favorites';
import FavoriteNotify from './components/favoritenotify';
import DynamicBackGround from './components/dynamic-bground';

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

  getRegister() {
    const isUser = Object.keys(this.props.user.data).length > 0;
    if (isUser) {
      return <Notify />;
    } 
    else  {
      return <FavoriteNotify />;
    }
  }

  render() {
    return (
      <Router>
        <div>
          <DynamicBackGround />
          <div className='container'>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/register" component={() => this.getRegister()} />
            <Route exact path="/signup" component={() => this.getForm('signup')} />
            <Route exact path="/login" component={() => this.getForm('login')} />
            <Route exact path="/favorites" component={() => this.getFavorites()} />
          </div>
        </div>
      </Router> 
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);