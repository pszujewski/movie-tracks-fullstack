import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// Redirect
import {fetchMovieTitles} from './actions';

import Header from './components/header';
import Home from './components/home';
import Form from './components/form';
// import Music from './components/music';

export class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchMovieTitles());
  }

  getForm(type) {
    return <Form formType={type} />;
  }

  render() {
    return (
      <Router> 
        <div className='container'>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={() => this.getForm('signup')} />
          <Route exact path="/login" component={() => this.getForm('login')} />
        </div>
      </Router> 
    );
  }
}

export default connect()(App);