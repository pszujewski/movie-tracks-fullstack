import React from 'react';
import './form.css'

export default function Form(props) {
  function getForm() {
    if (props.formType === 'signup') {
      return (
        <form>
          <label>First Name</label>
          <input placeholder='Jane' className="u-full-width" type="text" id='firstName'/>
          <label>Last Name</label>
          <input placeholder='Doe' className="u-full-width" type="text" id='lastName'/>
          <label>Email</label>
          <input placeholder='foo@bar.com' className="u-full-width" type="email" id='email' />
          <label>Password</label>
          <input placeholder='1234pw' className="u-full-width" type="text" id='password' required/>
          <button className="u-full-width btn-sign-in">Sign up</button>
          <div className='anchor-bin'>
            <a id='js-new-acct'>Already have an account? Log in here</a>
          </div>
        </form>
      );
    }
    else if (props.formType === 'login') {
      return (
        <form>
          <label>Email</label>
          <input placeholder='foo@bar.com' className="u-full-width" type="email" id='email' />
          <label>Password</label>
          <input placeholder='1234pw' className="u-full-width" type="text" id='password' required/>
          <button className="u-full-width btn-sign-in">Log In</button>
          <div className='anchor-bin'>
            <a id='js-new-acct'>Don't have an account? Sign up here</a>
          </div>
        </form>
      );
    }
  }

  return (
    <div className='row'>
      <div className='form-wrapper'>
        <div className='title'>
          <h1>{props.formType === 'signup' ? 'Sign Up' : 'Log In'}</h1>
        </div>
        {getForm()}
      </div>
    </div> 
  );
}