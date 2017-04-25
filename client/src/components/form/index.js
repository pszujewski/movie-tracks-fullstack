import React from 'react';
import './form.css';
import {postSignUp, fetchLogInData} from '../../actions/register';
import {connect} from 'react-redux';

export class Form extends React.Component {

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.formType === 'signup') {
      const component = this;
      const newUser = {
        firstName: component.firstName.value,
        lastName: component.lastName.value,
        email: component.email.value,
        password: component.password.value
      };
      this.props.dispatch(postSignUp(newUser));
      this.firstName.value = '';
      this.lastName.value = '';
    }
    else if (this.props.formType === 'login') {
      this.props.dispatch(fetchLogInData(this.email.value, this.password.value));
    }
    this.email.value = '';
    this.password.value = '';
  }

  getForm() {
    if (this.props.formType === 'signup') {
      return (
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>First Name</label>
          <input placeholder='Jane' className="u-full-width" type="text" id='firstName'ref={input => this.firstName = input} />
          <label>Last Name</label>
          <input placeholder='Doe' className="u-full-width" type="text" id='lastName' ref={input => this.lastName = input} />
          <label>Email</label>
          <input placeholder='foo@bar.com' className="u-full-width" type="email" id='email' ref={input => this.email = input} />
          <label>Password</label>
          <input placeholder='1234pw' className="u-full-width" type="text" id='password' required ref={input => this.password = input} />
          <button className="u-full-width btn-sign-in">Sign up</button>
          <div className='anchor-bin'>
            <a id='js-new-acct'>Already have an account? Log in here</a>
          </div>
        </form>
      );
    }
    else if (this.props.formType === 'login') {
      return (
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Email</label>
          <input placeholder='foo@bar.com' className="u-full-width" type="email" id='email' ref={input => this.email = input} />
          <label>Password</label>
          <input placeholder='1234pw' className="u-full-width" type="text" id='password' required ref={input => this.password = input} />
          <button className="u-full-width btn-sign-in">Log In</button>
          <div className='anchor-bin'>
            <a id='js-new-acct'>Don't have an account? Sign up here</a>
          </div>
        </form>
      );
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='form-wrapper'>
          <div className='title'>
            <h1>{this.props.formType === 'signup' ? 'Sign Up' : 'Log In'}</h1>
          </div>
          {this.getForm()}
        </div>
      </div> 
    );
  }
}

export default connect()(Form);